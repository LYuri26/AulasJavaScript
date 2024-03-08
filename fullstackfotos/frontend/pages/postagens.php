<?php
include '../../backend/connect.php';

$postagens = array(
    array(
        'id' => 1,
        'titulo' => 'A Era do Capital Improdutivo',
        'imagem' => 'aeradocapitalimprodutivo.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 2,
        'titulo' => 'A Origem da Família da Propriedade Privada e do Estado',
        'imagem' => 'aorigemdafamíliadapropriedadeprivadaedoestado.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 3,
        'titulo' => 'Vigiar e Punir',
        'imagem' => 'vigiarepunir.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 4,
        'titulo' => 'As Veias Abertas da América Latina',
        'imagem' => 'asveiasabertasdaamericalatina.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 5,
        'titulo' => 'Democracia e Luta de Classes',
        'imagem' => 'democraciaelutadeclasses.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 6,
        'titulo' => 'O Livro Vermelho',
        'imagem' => 'olivrovermelho.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 7,
        'titulo' => 'Desigualdade e Caminhos para uma Sociedade Mais Justa',
        'imagem' => 'desigualdadeecaminhosparaumasociedademaisjusta.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
    array(
        'id' => 8,
        'titulo' => 'Manifesto Comunista',
        'imagem' => 'manifestocomunista.jpg',
        'likes' => 0,
        'comentarios' => 0
    ),
);
?>

<div class="container">
    <?php
    // Verifica se $postagens é um array válido
    if (isset($postagens) && is_array($postagens)) {
        // Loop através das postagens divididas em seções de três
        for ($i = 0; $i < count($postagens); $i += 3) {
            ?>
            <div class="row">
                <?php
                // Loop para cada postagem na seção atual
                for ($j = $i; $j < $i + 3 && $j < count($postagens); $j++) {
                    ?>
                    <div class="col-4">
                        <div class="post" id="post-<?php echo $postagens[$j]['id']; ?>">
                            <img src="../static/images/fotos/<?php echo $postagens[$j]['imagem']; ?>" alt="<?php echo $postagens[$j]['titulo']; ?>" class="regular-image" id="imagem-<?php echo $postagens[$j]['id']; ?>" onclick="openModal(this, <?php echo $postagens[$j]['id']; ?>)">
                            <div class="actions">
                                <img src="../static/images/icons/coracao.svg" alt="Coração" class="like-icon" onclick="like(<?php echo $postagens[$j]['id']; ?>)">
                                <span class="likes"><?php echo $postagens[$j]['likes']; ?></span>
                                <img src="../static/images/icons/coment.svg" alt="Comentário" onclick="openModal('../static/images/fotos/<?php echo $postagens[$j]['imagem']; ?>', <?php echo $postagens[$j]['id']; ?>)">
                                <span class="comments"><?php echo $postagens[$j]['comentarios']; ?></span>
                            </div>
                        </div>
                    </div>
                <?php
                }
                ?>
            </div>
        <?php
        }
    }
    ?>
</div>
