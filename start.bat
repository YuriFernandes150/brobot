@echo off
title Discord JS
:1
cd %directory%
echo [+] Porfavor, digite o nome do arquivo do BOT.
echo.
echo [-] Exemplo ; index
echo.
set /p type=%username%@root~#

:prefix
echo.
echo Escreva um comando entre; 'ligar', 'desligar' ou 'ajuda'.
echo [IMPORTANTE : Pressione CTRL + C para Desligar.]
echo.
set /p type2=%username%@root~#
goto %type2%

:prefix_lnk
set /p type3=%username%@root~#
goto %type3%

:ligar
node %type%.js
goto prefix_lnk

:desligar
start DiscordJS.exe
taskkill /f DiscordJS.exe

:ajuda
echo.
echo ! [= Exibindo Comandos =] !
echo.
echo ligar - Liga o BOT.
echo desligar - Desliga o BOT.
echo ajuda - Exibe comandos.
echo creditos - Mostra os creditos.
echo musica - Caso queira curtir uma musica...
echo parar_musica - Parar a musica!
goto prefix

:creditos
echo.
echo by YellowAnimate #8992
echo.
goto :prefix_lnk

:musica
set file=song.mp3
( echo Set Sound = CreateObject("WMPlayer.OCX.7"^)
  echo Sound.URL = "%file%"
  echo Sound.Controls.play
  echo do while Sound.currentmedia.duration = 0
  echo wscript.sleep 100
  echo loop
  echo wscript.sleep (int(Sound.currentmedia.duration^)+1^)*1000) >sound.vbs
start /min sound.vbs
goto prefix_lnk

:parar_musica
taskkill /f /im "wscript.exe"
del /q sound.vbs
goto prefix_lnk