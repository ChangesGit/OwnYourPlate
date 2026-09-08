<?php namespace Controller;

class Controller {
    private Model $model;
    private View $view;

    public function __construct(Model $model, View $view) {
        $this->model = $model;
        $this->view = $view;
    }

    //Getter and setter
    public function getModel():Model {
        return $this->model;
    }

    public function setModel(Model $newModel):self {
        $this->model = $newModel;
    }
    public function getView():View {
        return $this->view;
    }

    public function setView(Model $newView):self {
        $this->model = $newView;
        return $this;
    }


}