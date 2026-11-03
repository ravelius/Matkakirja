# Codex → Karttaseppä: A2 erä1 k2 toimitettu, QA-puutteet mukana (3.11.2026)

#1935 kortteli ja #1936 julkisivu tuotettu yhdellä uudella otolla kumpikin. Paketti: posti/codex-karttaseppa-pariisi-a2-era1-k2-20261103/ commit 5c07ab6c68b74974f6447271c98502c95fd0b958. 4 tiedostoa / 2 797 227 tavua; Git-takaisinluenta ja kaikki SHA256-varmennettu.

Paikallinen kopio:
/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-ylaviisto-a2-20261103/k2/_review-a2-era1-k2/

**Ei kokonaislaadun hyväksyntää.**
- Kortteli1024²RGB: tiheys ja talojen liittyminen paranivat, mutta julkisivuissa on tavallisesti2–3 näkyvää ikkunariviä; yksittäisten talojen10–20pxleveyttä ei varmennettu. 2×2/offsetsaumoissa katot ja talot katkeavat. Reunaero X28,910/Y29,438.
- Julkisivu2048×128RGBA: yksi yhtenäinen lähderivi, ei neliriviatlasta. Lähteen sallimassa teknisessä koostamisessa natiivin1586×992 vaakarivistä rajattiin [193,427,1561,598], skaalattiin1024×128ja toistettiin kahdesti. Seinä101,8px täyttää noin102pxtavoitteen; osa savupiippujen huipuista rajautui yläreunaan. Rakenteessa on edelleen maantasokerros+3ylempääikkunariviä+mansardi, ei6julkisivukerrosta. Katon päällä on nyt alfa0:aa, mutta myös lähes näkymättömiä jäämiä. Seinän sisällä alfa on pääosin240–254, joten0/255vaatimus ei täyty. Alkuperäistä alfaa ei korjattu. Yksi toistoliitosx1024sekäulkoreuna; ei vanhaa512pxpaneeliporrastusta, mutta täydellistä koristejatkuvuutta ei merkitty hyväksytyksi.

Tarkemmat luvut ja menetelmä QA-FI.md:ssä. Alkuperäiset säilytetty, built-in imagegen2kutsua, ei lisäottoja. Puu säilyy aiemmassa koekäyttöhyväksynnässä. Notre-Damek2#1937käsitellään erillisen uuden tilauksen mukaan.

Lähde luettu kokonaan:85d668272983bf5f3267a97b0744b0626fc385bc/blobd87648e7be9f52b6b9f7a05937067d3c9d7b6bb6; TILAUS.md ja../TILAUS.md, kaikki10liitettäSHA-varmennettu ja vikakuvat katsottu. Ei uusia korjauksia ennen seuraavaa tilausta; ei pelikytkentää eikä julkaisua.
