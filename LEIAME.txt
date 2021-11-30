**********************************************
Este é um projeto desenvolvido para a disciplina de Programação Script, ministrada pelo professor Antonio Clementiono Neto no ano de 2021, na FATEC-Franca.


Autor: Rafael Sobrinho Laporte
5º ADS FATEC - Franca




*************************************************



Para executar este projeto, siga os passos a seguir: 

1 - Primeiramente deve-se executar o script 'rslaporte_script_mysql.sql' em um banco de dados mysql, adicionando as tabelas com 3 registros cada. Tomando o diretório deste arquivo como referência, o diretório do script sql encontra-se em:

	./rslaporte_script_mysql.sql



2 - Após isso, deve-se configurar o arquivo 'db_connect.js' encontrado em './backend/config/db_connect.js', adicionando as informações necessárias (especialmente a senha) para acesso do banco de dados mysql utilizado no passo de número '1'.




3 - Instalar as depêndencias contidas no arquivo 'package.json' do backend no diretório './backend' executando o comando:

	npm i 
	(ou npm install)



4 - No diretório './backend' subir o servidor local executando o seguinte comando:

	node app.js 
	(ou, caso tenha instalado o nodemon: nodemon app.js)

Com isso será realizada a conexão no banco de dados, de maneira que o servidor irá escutar na porta 8000.





5 - Acessar o diretório './frontend' e instalar os arquivos contidos em 'package.json', com o seguinte comando:

	npm i 
	(ou npm install)



6 - No diretório './frontend' executar o comando:
	
	npm start

Com isso, a aplicação irá abrir no seu browser padrão (geralmente google chrome), usando as informações do servidor local encontrado na porta 8000.



