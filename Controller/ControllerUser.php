<?php namespace Controller;

use Controller\Controller;

class ControllerUser extends Controller {
        

    public function renderSignUp():void {
        $this->registerUser();
        $this->getView()->displayAll();
    }

        public function registerUser():void{
        //Vérifier si je reçoit le formulaire d'inscription
        if(isset($_POST['submitSignUp'])){

            $name = trim($_POST['name']);
            $email = trim($_POST['email']);
            $password = $_POST['password'];
            $passwordVerify = $_POST['confirm-password'];

            //Vérifier les champs vides
            if(empty($name) || empty($email) || empty($password) || empty($passwordVerify)){
                $this->getView()->setMessage('Veuillez remplir tous les champs.');
                return;
            }

            //Vérifier le format de l'email
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $this->getView()->setMessage("L'Email n'est pas au bon format.");
                return;
            }

            //Vérifier la concordance des mots de passe
            if($password !== $passwordVerify){
                $this->getView()->setMessage("Vos mots de passe ne correspondent pas.");
                return;
            }
            
            //Hasher le mot de passe
            $password = password_hash($password, PASSWORD_DEFAULT);

            //Je vais fournir au modèle ces données
            $this->getModel()->setName($name)->setEmail($email)->setPassword($password);

            //Vérifier si l'email est libre
            $data = $this->getModel()->findByEmail();
            if($data){
                $this->getView()->setMessage("Cet email est déjà enregistrée.");
                return;
            }

            //Lancement de l'insertion en BDD
            $this->getModel()->addUser();

            $this->getView()->setMessage("Votre compte a bien été créé.");
        }
    }
}

