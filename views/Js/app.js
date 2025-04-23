const app = angular.module('AppTarefas', []);

app.controller('TarefasController', function($scope, $http) {
    const apiUrl = 'http://localhost:3000/api/tasks';

    $scope.novaTarefa = {};
    $scope.tarefas = [];

    // Buscar tarefas
    const carregarTarefas = function() {
        $http.get(apiUrl)
            .then(function(response) {
                $scope.tarefas = response.data;
            })
            .catch(function(error) {
                console.error('Erro ao carregar tarefas:', error);
            });
    };

    // Adicionar tarefa
    $scope.adicionarTarefa = function() {
        if (!$scope.novaTarefa.hora || !$scope.novaTarefa.descricao || !$scope.novaTarefa.data) {
            alert("Preencha todos os campos!");
            return;
        }

        let horaFormatada = "";

        // Trata diferentes formatos de entrada
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

        $http.post(apiUrl, tarefa)
            .then(function(response) {
                $scope.novaTarefa = {}; // Limpa os campos
                carregarTarefas(); // Recarrega a lista
            })
            .catch(function(error) {
                console.error('Erro ao adicionar tarefa:', error);
            });
    };

    // Remover tarefa
    $scope.removerTarefa = function(id) {
        $http.delete(`${apiUrl}/${id}`)
            .then(function(response) {
                carregarTarefas();
            })
            .catch(function(error) {
                console.error('Erro ao remover tarefa:', error);
            });
    };

    // Concluir tarefa (opcional)
    $scope.concluirTarefa = function(id) {
        // A implementar se desejar
    };

    // Inicialização
    carregarTarefas();
});
