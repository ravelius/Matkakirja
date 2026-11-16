-- Päivitä Matkakirja.app (JU 16.11.2026; omistaja 17.2x, KK:n tehtävä): ajaa sisäisen paivita.zsh:n ja näyttää edistymisen.
on run
	set skripti to POSIX path of (path to resource "paivita.zsh")
	set tila to do shell script "mktemp -t matkakirja-tila"
	set p to do shell script "MATKAKIRJA_TILA=" & quoted form of tila & " /bin/zsh " & quoted form of skripti & " > /dev/null 2>&1 & echo $!"
	set progress total steps to -1
	set progress description to "Päivitä Matkakirja"
	set progress additional description to "Tarkistetaan versiota…"
	set viimeinen to ""
	repeat
		delay 0.4
		set rivi to do shell script "tail -1 " & quoted form of tila & " 2>/dev/null; true"
		if rivi begins with "LOPPU" then exit repeat
		if rivi is not "" then
			set viimeinen to rivi
			set progress additional description to rivi
		end if
		try
			do shell script "kill -0 " & p
		on error
			exit repeat
		end try
	end repeat
	set rivi to do shell script "tail -1 " & quoted form of tila & " 2>/dev/null; true"
	do shell script "rm -f " & quoted form of tila
	if rivi is "LOPPU 0" then
		display notification viimeinen with title "Matkakirja"
		delay 1
	else
		display dialog viimeinen buttons {"OK"} default button 1 with title "Päivitä Matkakirja" with icon caution
	end if
end run
