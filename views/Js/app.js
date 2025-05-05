const app = angular.module('AppTarefas', []);

app.controller('TarefasController', function($scope, $http) {
    const apiUrl = 'https://gestao-de-tarefas--nu.vercel.app/api/tasks';



    $scope.novaTarefa = {};
    $scope.tarefas = [];
    $scope.editando = false;
    $scope.idEditando = null;

    const carregarTarefas = function() {
        $http.get(apiUrl)
            .then(function(response) {
                $scope.tarefas = response.data;
            })
            .catch(function(error) {
                console.error('Erro ao carregar tarefas:', error);
            });
    };

    $scope.adicionarTarefa = function() {
        if (!$scope.novaTarefa.hora || !$scope.novaTarefa.descricao || !$scope.novaTarefa.data) {
            alert("Preencha todos os campos!");
            return;
        }

        let horaFormatada = "";

        if (typeof $scope.novaTarefa.hora === 'string') {
            horaFormatada = $scope.novaTarefa.hora.substring(0, 5);
        } else if ($scope.novaTarefa.hora instanceof Date) {
            const horas = $scope.novaTarefa.hora.getHours().toString().padStart(2, '0');
            const minutos = $scope.novaTarefa.hora.getMinutes().toString().padStart(2, '0');
            horaFormatada = `${horas}:${minutos}`;
        } else {
            alert("Formato de hora inválido.");
            return;
        }

        const tarefa = {
            hora: horaFormatada,
            tarefa: $scope.novaTarefa.descricao,
            data: $scope.novaTarefa.data
        };

        if ($scope.editando) {
            // Atualização
            $http.put(`${apiUrl}/${$scope.idEditando}`, tarefa)
                .then(function(response) {
                    $scope.novaTarefa = {};
                    $scope.editando = false;
                    $scope.idEditando = null;
                    carregarTarefas();
                })
                .catch(function(error) {
                    console.error('Erro ao atualizar tarefa:', error);
                });
        } else {
            // Criação
            $http.post(apiUrl, tarefa)
                .then(function(response) {
                    $scope.novaTarefa = {};
                    carregarTarefas();
                })
                .catch(function(error) {
                    console.error('Erro ao adicionar tarefa:', error);
                });
        }
    };

    $scope.editar = function(id) {
        const tarefaSelecionada = $scope.tarefas.find(t => t.id === id);
        if (tarefaSelecionada) {
            $scope.novaTarefa.hora = tarefaSelecionada.hora;
            $scope.novaTarefa.descricao = tarefaSelecionada.tarefa;
            $scope.novaTarefa.data = tarefaSelecionada.data;
            $scope.editando = true;
            $scope.idEditando = id;
        }
    };

    $scope.removerTarefa = function(id) {
        $http.delete(`${apiUrl}/${id}`)
            .then(function(response) {
                carregarTarefas();
            })
            .catch(function(error) {
                console.error('Erro ao remover tarefa:', error);
            });
    };

    carregarTarefas();
});
