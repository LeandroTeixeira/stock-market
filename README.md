# Case XP
<img src="./assets/Title-Image_1.jpg"  width=100% height=100%>

## Descrição do Projeto
Este projeto foi desenvolvido para o desafio técnico do processo seletivo da XP Inc ocorrido no segundo semestre de 2022. A proposta consistia no desenvolvimento de um backend para uma aplicação de mercado de ações. Além disto, foi desenvolvido um sistema baseado em algoritmos de Machine Learning para sugerir movimentações futuras.


## Features 
- Dados reais do valor de mais de 140 empresas ao longo de 2 anos cuidadosamente selecionados e preparados para oferecer a melhor experiência ao usuário
- Possibilidade do usuário consultar o valor, comprar e vender ações além de depositar e retirar dinheiro.
- Possibilidade de adicionar, deletar e atualizar usuário.
- Restrições sobre quais informações usuários podem obter sobre as contas de outros usuários
- Possibilidade de pedir sugestões sobre quais as melhores ações para se comprar ou vender baseado na renda atual e na variação prevista.
    - Possibilidade de obter previsões diferentes dependendo da quantidade de risco que a pessoa está disposta a correr
- Possibilidade de estudar as trends recentes e ver quais empresas tiveram as maiores altas e quedas.
- Autenticação de usuário usando JWT, trazendo maior segurança à aplicação.
- API construída de forma versionada para reduzir o trabalho caso outras versões venham a ser implementadas.
- Tabelas usuário e companhia implementadas em MySQL utilizando Sequelize.
- Mais de 30 mil dados reais de ações implementadas em NoSQL utilizando Mongoose.
    - Utilização de princípios e técnicas avançadas como factory e memoization para garantir eficiência ao lidar com tantos dados.
- Implementação de uma aritmética própria para trazer uma precisão numérica maior do que computadores costumam oferecer.
- Testes automatizados que cobrem mais de 98.5% das linhas do backend Node.
- Análise e preparo dos dados usando ferramentas como Pandas, NumPy e Sci-kit Learn.
- Algoritmos de Machine Learning treinados com dezenas de milhões de dados para oferecerem as melhores previsões possíveis.
    - Modelos salvos e disponíveis para o uso de qualquer pessoa independente do acesso aos dados
- Informações detalhadas sobre o desenvolvimento do modelo, incluindo métricas de desempenho e tentativas malsucedidas.
- Algoritmo para, a partir das previsões, desenvolver a melhor estratégia para o mercado.
- Aplicação web desenvolvida em Python utilizando Flask que permite o acesso às sugestões independentemente do backend em Node.


Para mais informações sobre cada feature, inclusive detalhes de implementação e alternativas consideradas, é possível conferir a documentação do [servidor principal (Node)](./backend/) e do [análise de dados (Python)](./data/).

## Instalando e executando o projeto
_nota: Este projeto foi desenvolvido no Windows 10. Alguns comandos podem não funcionar corretamente em outros ambientes_

#### Programas Necessários
- [Conda versão 4.13 ou superior](https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html#choosing-a-version-of-anaconda-or-miniconda)
- [Python versão 3.8 ou superior](https://www.python.org/downloads/) (Vem incluso nos instaladores de Anaconda e Miniconda).
- [Node JS versão 16.13 ou superior](https://nodejs.org/en/download/)
- [My SQL Server versão 8.0 ou superior](https://dev.mysql.com/downloads/installer/)

#### Executando o projeto:

Com o terminal:
- Baixe o projeto usando `git clone https://github.com/LeandroTeixeira/case-xp.git`
- Entre na pasta do projeto utilizando `cd case-xp`
- Instale as dependências com `npm install`
- Renomeie o arquivo `.env.example` para `.env` e configure as variáveis referentes ao servidor SQL.
- Para executar o servidor, execute `npm run server`

Com o Anaconda Prompt:
- Entre na pasta do projeto usando comandos cd
- Uma vez na pasta principal, entre na pasta de dados com `cd data`
- Crie um conda environment executando `conda env create --file environment.yml`
- Ative o environment executando `activate LT-case-xp`
- Use `set FLASK_ENV=development` e `set FLASK_APP=server.py` para configurar o flask.
- Para executar, use `flask run`

_Nota: se a rota GET investimentos/:id estiver demorando demais para ser executada, pode ser necessário apertar Enter no Anaconda Prompt. Este problema é causado por problemas de versão entre o sci-kit Learn instalado e o utilizado no desenvolvimento._

## Princípios seguidos ao desenvolver o projeto

<details>
    <summary>Montar uma aplicação que eu gostaria de usar</summary>

- Restrições sobre quais informações usuários podem obter sobre as contas de outros usuários (não gostaria que qualquer usuário pudesse ver meus fundos).
- Possibilidade de estudar as trends recentes e ver quais empresas tiveram as maiores altas e quedas (gostaria de ter acesso às informações para me orientar sobre o andamento do mercado).
- Possibilidade de pedir sugestões sobre quais as melhores ações para se comprar ou vender baseado na renda atual e na variação prevista (não entendo o mercado de ações e gostaria de um sistema que me ajudasse a escolher aonde investir).
- Possibilidade de obter previsões diferentes dependendo da quantidade de risco que a pessoa está disposta a correr (ao lidar com investimentos, minha prioridade é minimizar perdas. Gostaria que o sistema me desse uma recomendação diferente da que daria a alguém disposto a correr riscos para obter maior lucro).
</details>

<details>
    <summary>Pensar no problema como algo real de um sistema que será usado por milhões de usuários</summary>

- API construída de forma versionada para reduzir o trabalho caso outras versões venham a ser implementadas.
- Autenticação de usuário usando JWT, trazendo maior segurança à aplicação.
- Dados reais do valor de mais de 140 empresas ao longo de 2 anos cuidadosamente selecionados e preparados para oferecer a melhor experiência ao usuário (simulação de uma base de dados com dados reais e um volume de dados capaz de causar um impacto realista na performance).
- Tabelas usuário e companhia implementadas em MySQL utilizando Sequelize. Mais de 30 mil dados reais de ações implementadas em NoSQL utilizando Mongoose (escolha da database a ser utilizada leva em conta a integridade referencial exigida por cada tabela e também se o melhor escalonamento a ser usado é o horizontal ou o vertical. Para mais informações sobre a diferença entre os diferentes escalonamentos, acesse https://medium.com/xp-inc/design-de-sistemas-distribu%C3%ADdos-escalonamento-vertical-e-escalonamento-horizontal-a162a2c66cbe#:~:text=Entende%2Dse%20por%20escalonamento%20horizontal,no%20design%20de%20sistemas%20distribu%C3%ADdos).
- Utilização de princípios e técnicas avançadas como factory e memoization para garantir eficiência ao lidar com tantos dados (memoization é uma forma de salvar os resultados de operações complexas para poupar processamento caso a mesma operação seja necessária de novo. Para quantias pequenas de dados em um servidor que não fica no ar por muito tempo, o custo em tempo e memória de preparar essa estrutura costuma não compensar os ganhos. Para um servidor acessando um banco de dados com milhões de dados, o ganho é relevante).
- Implementação de uma aritmética própria para trazer uma precisão numérica maior do que computadores costumam oferecer (computadores não são capazes de representar de forma precisa números que não podem ser expressos na base 2; isso acarreta em uma precisão que começa a decair por volta da décima quinta casa decimal. O mercado de ações lida todos os anos com bilhões de operações, frequentemente com números com precisão de mais de duas casas decimais. Para impedir que essa representação aliada com essa quantidade de dados cause problemas a longo prazo, foi desenvolvida uma aritmética para dar às operações de adição, subtração e multiplicação toda a precisão necessária).
</details>

<details>
    <summary>Não ter medo de desafios. Para trabalhar na XP, é necessário ter a coragem de um programador da XP</summary>
    
- Testes automatizados que cobrem mais de 98.5% das linhas do backend Node (testes automatizados sempre foram minha maior dificuldade entre os conteúdos aprendidos na Trybe).
- O plano original envolvia o desenvolvimento também de um frontend em React. Recebi um projeto mas abracei o desafio de tentar entregar três.
- Aplicação web desenvolvida em Python utilizando Flask que permite o acesso às sugestões independentemente do backend em Node (antes de desenvolver o projeto, não sabia nada sobre Flask. Ainda assim, abracei o desafio).
- Algoritmos de Machine Learning treinados com dezenas de milhões de dados para oferecerem as melhores previsões possíveis (já possuía experiência teórica com esses algoritmos mas nunca havia tentado resolver problemas usando eles. O problema em questão de previsão de ações, inclusive, era um que eu estava me preparando para ser capaz de resolvê-lo daqui há um ano).
</details>

## Lições aprendidas com o projeto
<details>
    <summary>Você não sabe do que é capaz de fazer até tentar</summary>
    <p></p>
O projeto como um todo foi um dos maiores desafios da minha vida devido à quantidade de features que me propus a fazer, a complexidade destas features e o tempo disponível para fazê-las. Fui capaz de realizá-lo e apresentar uma qualidade maior do que eu imaginava que conseguiria. Ele coroa um ano em que eu superei meus limites a cada dia.
</details>
<details> 
<summary>Não há problema em simplificar ideias. Nessas horas, o importante é reconhecer quais simplificações foram feitas, o impacto que elas causam no projeto e qual o caminho até a versão idealizada</summary>
    <p></p>
   
Existem diversos exemplos disso no projeto, mas o mais marcante é o algoritmo de previsão. O que foi implementado é um sistema que sugere as ações para vender agora baseado em quais vão estar valendo menos daqui a N dias sendo N um valor maior que zero inserido pelo usuário. O plano original era apontar o dia entre hoje e hoje + N que a ação chegaria a seu maior preço, porém isso levaria a ter que calcular o valor da ação em todos os dias neste período para cada empresa. Isso se mostrou pesado demais para meu sistema, então o projeto teve de ser simplificado.

Da mesma forma, o algoritmo para sugerir as compras sugere o melhor lugar para se colocar todo o dinheiro. A ideia original era mais complexa; envolvia dar a melhor combinação de ações a se comprar (que poderia até mesmo não envolver a mais lucrativa), com um ajuste para a quantidade de risco que um usuário está disposto a tomar (pensando em mim enquanto usuário, preferiria uma recomendação com mais empresas que não acarretasse numa perda tão grande se uma falir de repente, mesmo que o resultado fosse um lucro menor) e levando em conta o lucro imediato resultante da venda das ações. Da mesma forma que o algoritmo de venda, fui incapaz de elaborar um algoritmo que resolvesse este problema sem acarretar em problemas no sistema.

Em ambos os casos, as simplificações ocorreram tanto por limitações do sistema quanto por limitações de prazo por terem sido a última feature a ser implementada, porém fui capaz de identificar os caminhos para a versão completa. Caso o projeto venha a ser expandido, o próximo passo aqui está definido e isso é o que importa.

</details>
<details>
<summary> Ser capaz de sonhar grande implica também em ser capaz de entender a hora de abandonar uma ideia </summary>
    <p></p>
O principal exemplo de ideia abandonada (ao invés de simplificada) é o front end. Pouco tempo atrás desenvolvi um projeto pessoal de React do qual me orgulho muito e pretendia implementar algo parecido neste projeto, porém passar esse tempo todo sem prática com a tecnologia afetou a minha desenvoltura ao utilizá-la. No final das contas, acabei abandonando de vez a ideia ao notar que ela não agregaria tanto à API como eu imaginava. O código permanece no projeto e consiste basicamente de enxertos sem coerência do projeto que me orgulho.
</details>
<details>
    <summary>Na dúvida, a documentação oficial é sempre sua melhor amiga</summary>
     <p></p>   
Boa parte da parte em Python foi desenvolvida estudando diretamente as APIs. Sci-kit Learn, em especial, possui uma documentação muito bem estruturada e facilita a compreensão do próximo passo no desenvolvimento. Flask também não fica para trás. Mais do que vídeo aulas e artigos externos, a parte mais importante do meu desenvolvimento foi consultar o que os criadores da tecnologia tinham a dizer sobre como utilizá-la.
</details>


Para mais informações sobre os desenvolvimentos, incluindo os principais desafios encontrados, é possível conferir a documentação do [servidor principal (Node)](./backend/) e da [análise de dados (Python)](./data/).

## Bibliografia

<details>
<summary>Referências do Projeto</summary>

- https://www.kaggle.com/datasets/borismarjanovic/price-volume-data-for-all-us-stocks-etfs?resource=download
- https://labelyourdata.com/articles/stock-market-and-machine-learning
- https://www.analyticsvidhya.com/blog/2021/10/machine-learning-for-stock-market-prediction-with-step-by-step-implementation/
- https://www.ijert.org/study-of-machine-learning-algorithms-for-stock-market-prediction
- https://neptune.ai/blog/predicting-stock-prices-using-machine-learning
- https://www.sciencedirect.com/science/article/pii/S1877050918307828
- https://www.ic.unicamp.br/~ra023169/publications/jp13.pdf
- https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
- https://www.cloudzero.com/blog/horizontal-vs-vertical-scaling#:~:text=While%20horizontal%20scaling%20refers%20to,%2C%20storage%2C%20or%20network%20speed.
- https://academind.com/tutorials/sql-vs-nosql
- https://medium.com/xp-inc/design-de-sistemas-distribu%C3%ADdos-escalonamento-vertical-e-escalonamento-horizontal-a162a2c66cbe#:~:text=Entende%2Dse%20por%20escalonamento%20horizontal,no%20design%20de%20sistemas%20distribu%C3%ADdos
- https://zerotomastery.io/courses/learn-tensorflow/#Project
- https://en.wikipedia.org/wiki/Coefficient_of_determination
- https://www.analyticsvidhya.com/blog/2020/03/one-hot-encoding-vs-label-encoding-using-scikit-learn/
- https://pythonistaplanet.com/flask/
- https://engsoftmoderna.info/cap6.html#f%C3%A1brica
- https://en.wikipedia.org/wiki/Singleton_pattern
- https://medium.com/xp-inc/a-ci%C3%AAncia-de-dados-com-foco-no-cliente-33bf7c209436

</details>
