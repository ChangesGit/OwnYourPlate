<?php namespace Controller;

use Controller\Controller;
use Model\Model;
use View\View;
use Utils\Utils;

class ControllerHome extends Controller {
    private ?Model $modelRecipe;

    public function __construct(Model $model, ?Model $modelRecipe, View $view)
    {
        $this->modelRecipe = $modelRecipe;
        parent::__construct($model, $view);
    }


    //METHODS
    public function renderHome():void {
        $data = $this->modelRecipe->findAllIngredientsLimit(10);
        $this->getView()->setData($data);
        $this->logIn();
        $this->getView()->displayAll();
    }

    public function logIn():void{
        //1. Vérifier que l'on reçoive le formulaire de connexion
        if(isset($_POST['submitLogin'])){
            
            //2. Vérifier les champs : champs vide, format des données, nettoyage
            if(empty($_POST['email']) || empty($_POST['password'])){
                $this->getView()->getViewHeader()->setLoginMessage('Veuillez remplir tous les champs');
                return;
            }
                
            //Vérification du format d'email
            if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
                $this->getView()->getViewHeader()->setLoginMessage('Email pas au bon format');
                return;
            }

            //Nettoyer mes datas
            $email = trim($_POST['email']);
            $password = trim($_POST['password']);

            //3. Demander au model d'aller trouver le compte utilisateur
            //a. Donner l'email au Model, puis le Model lance findByEmail
            $data = $this->getModel()->setEmail($email)->findByEmail();

            //b. Vérifier la réponse : si je reçois un tableau de donnée utilisateur, ou un false
            if(!$data){
                $this->getView()->getViewHeader()->setLoginMessage('Email et/ou Mot de Passe incorrect');
                return;
            }

            //4. Vérifier les mots de passe
            if(!password_verify($password, $data['password'])){
                //si l'email ne correspond à aucun compte
                $this->getView()->getViewHeader()->setLoginMessage('Email et/ou Mot de Passe incorrect');
                return;
            }
                            
            //5. Connecter l'utilisateur
            $_SESSION['userId'] = $data['user_id'];
            $_SESSION['name'] = $data['name'];
            $_SESSION['email'] = $data['email'];
            // $_SESSION['userType'] = $data['user_type'];
            // $_SESSION['createdAt'] = $data['created_at'];

            //6. Afficher le message de confirmation
            $this->getView()->getViewHeader()->setLoginMessage('Vous êtes bien connecté. Youpie !');
        }            
    }

    public function logOut():void {
        session_destroy();
        Utils::redirectToUrl('/');
    }
}