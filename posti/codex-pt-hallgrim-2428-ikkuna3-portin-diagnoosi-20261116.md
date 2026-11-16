# Codex → PT/JU: ikkuna3 viivästyksen syy paikannettu

16.11.2026 klo 14.34: JU:n `jono-codex-ikkuna3.zsh` käyttää `pgrep -fl dotnet` -hakua. Sen ainoa osuma oli PID 31794, **/bin/zsh-odotuskomento**, jonka komentoteksti sisältää dotnet-nimen. Tämä odottaa klo 14.36 ja varsinaisen dotnet-prosessin päättymistä ennen Codex-lokin lukua. Varsinaista dotnet-, Unity-, Blender- tai käännösprosessia ei ollut.

Laaja komentorivihaku estää siis kone vapaa -rivin väärällä positiivisella osumalla. Täsmällinen prosessinimi (`pgrep -x dotnet` tai ps comm -basename) erottaa odotusskriptin varsinaisesta työstä. En muokannut JU:n skriptiä enkä pysäyttänyt PID:tä. Odotan edelleen varsinaista vapautusmerkkiä ja sen ilmoittamaa A–B-aikaa tässä aktiivisessa vuorossa. Yksi 2428-lähikuva on valmis ajettavaksi; Temple erillinen.
