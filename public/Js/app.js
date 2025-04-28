const app = angular.module('AppTarefas', []);

app.controller('TarefasController', function($scope, $http) {
    const apiUrl = 'http://localhost:3000/api/tasks';

    $scope.novaTarefa = {};
    $scope.tarefas = [];
    $scope.editando = false;
    $scope.idEditando = null;

    function carregarTarefas() {
        $http.get(apiUrl)
            .then(response => {
                $scope.tarefas = response.data;
            })
            .catch(error => {
                console.error('Erro ao carregar tarefas:', error);
                alert('Erro ao carregar tarefas. Verifique sua conexão.');
            });
    }

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
            tarefa: $scope.novaTarefa.descricao.trim(),
            data: $scope.novaTarefa.data
        };

        if ($scope.editando) {
            // Atualizar tarefa
            $http.put(`${apiUrl}/${$scope.idEditando}`, tarefa)
                .then(() => {
                    limparFormulario();
                    carregarTarefas();
                })
                .catch(error => {
                    console.error('Erro ao atualizar tarefa:', error);
                    alert('Erro ao atualizar tarefa.');
                });
        } else {
            // Criar nova tarefa
            $http.post(apiUrl, tarefa)
                .then(() => {
                    limparFormulario();
                    carregarTarefas();
                })
                .catch(error => {
                    console.error('Erro ao adicionar tarefa:', error);
                    alert('Erro ao adicionar tarefa.');
                });
        }
    };

    $scope.editar = function(id) {
        const tarefaSelecionada = $scope.tarefas.find(t => t.id === id);
        if (tarefaSelecionada) {
            $scope.novaTarefa = {
                hora: tarefaSelecionada.hora,
                descricao: tarefaSelecionada.tarefa,
                data: tarefaSelecionada.data
            };
            $scope.editando = true;
            $scope.idEditando = id;
        }
    };

    $scope.removerTarefa = function(id) {
        if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
            $http.delete(`${apiUrl}/${id}`)
                .then(() => {
                    carregarTarefas();
                })
                .catch(error => {
                    console.error('Erro ao remover tarefa:', error);
                    alert('Erro ao remover tarefa.');
                });
        }
    };

    function limparFormulario() {
        $scope.novaTarefa = {};
        $scope.editando = false;
        $scope.idEditando = null;
    }

    carregarTarefas();
});
