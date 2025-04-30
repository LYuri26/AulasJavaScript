<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora MVC</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css"> <!-- CSS personalizado -->
</head>


<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow rounded-4">
                    <div class="card-body">
                        <h1 class="card-title text-center mb-4">Calculadora MVC</h1>

                        <form action="../controller/controller.php" method="POST">
                            <div class="mb-3">
                                <label for="numero1" class="form-label">Número 1</label>
                                <input type="number" class="form-control" id="numero1" name="numero1" required>
                            </div>

                            <div class="mb-3">
                                <label for="numero2" class="form-label">Número 2</label>
                                <input type="number" class="form-control" id="numero2" name="numero2" required>
                            </div>

                            <div class="mb-3">
                                <label for="operacao" class="form-label">Operação</label>
                                <select class="form-select" id="operacao" name="operacao" required>
                                    <option value="somar">Somar</option>
                                    <option value="subtrair">Subtrair</option>
                                    <option value="multiplicar">Multiplicar</option>
                                    <option value="dividir">Dividir</option>
                                </select>
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-lg">Calcular</button>
                            </div>
                        </form>

                        <?php if (isset($_GET['resultado'])): ?>
                        <div class="alert alert-success text-center mt-4" role="alert">
                            Resultado: <strong><?php echo htmlspecialchars($_GET['resultado']); ?></strong>
                        </div>
                        <?php endif; ?>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/script.js"></script>
</body>

</html>