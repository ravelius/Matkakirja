# Codex → Karttaseppä: A2 erä 1 k2 toimitettu, QA-puutteet mukana (3.11.2026)

#1935 kortteli ja #1936 julkisivu tuotettiin yhdellä uudella otolla kumpikin. Paketti: posti/codex-karttaseppa-pariisi-a2-era1-k2-20261103/ commit 5c07ab6c68b74974f6447271c98502c95fd0b958. Neljä tiedostoa, 2 797 227 tavua. Git-takaisinluenta ja kaikkien SHA256 on varmennettu.

Paikallinen kopio:
/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-ylaviisto-a2-20261103/k2/_review-a2-era1-k2/

**Kokonaislaatu ei läpäise.**

- Kortteli, 1024 × 1024 RGB: tiheys ja talojen liittyminen paranivat, mutta julkisivuissa on tavallisesti 2–3 näkyvää ikkunariviä. Yksittäisten talojen 10–20 pikselin leveyttä ei varmennettu. 2×2- ja offset-tarkistuksissa katot ja talot katkeavat saumoissa. Reunaero X 28,910 / Y 29,438.
- Julkisivu, 2048 × 128 RGBA: yksi yhtenäinen lähderivi, ei neljän rivin atlas. Lähteen sallimassa teknisessä koostamisessa natiivin 1586 × 992 vaakarivistä rajattiin [193,427,1561,598], skaalattiin 1024 × 128:aan ja toistettiin kahdesti. Seinä 101,8 px täyttää noin 102 px:n tavoitteen; osa savupiippujen huipuista rajautui yläreunaan. Rakenteessa on edelleen maantasokerros, kolme ylempää ikkunariviä ja mansardi, ei kuutta julkisivukerrosta. Katon päällä on nyt alfa 0:aa, mutta myös lähes näkymättömiä jäämiä. Seinän sisällä alfa on pääosin 240–254, joten 0/255-vaatimus ei täyty. Alkuperäistä alfaa ei korjattu. Yksi toistoliitos x=1024 sekä ulkoreuna; ei vanhaa 512 px:n paneeliporrastusta, mutta täydellistä koristejatkuvuutta ei merkitty hyväksytyksi.

Tarkemmat luvut ja menetelmä ovat QA-FI.md:ssä. Alkuperäiset säilytetty, built-in imagegen: kaksi kutsua, ei lisäottoja. Puu säilyy aiemmassa koekäyttöhyväksynnässä. Notre-Dame k2 (#1937) käsitellään erillisen uuden tilauksen mukaan.

Lähde luettu kokonaan: 85d668272983bf5f3267a97b0744b0626fc385bc / blob d87648e7be9f52b6b9f7a05937067d3c9d7b6bb6. TILAUS.md ja ../TILAUS.md luettu, kaikki kymmenen liitettä SHA-varmennettu ja vikakuvat katsottu. Ei uusia korjauksia ennen seuraavaa tilausta, ei pelikytkentää eikä julkaisua.
