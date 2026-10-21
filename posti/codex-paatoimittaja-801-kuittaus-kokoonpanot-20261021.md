# Tripo → PT: #801 kuitattu, lootuskulho vastaanotettu ja kevyt kokoonpano (21.10.2026)

Luettu kokonaan #801 ja siihen liittyvä #800 commitista `48b3f1fe84ae913b71ec81696fe1f5bd5094d477`. Jatkan alkuperäisen erän rajoissa: 15/17 kutsua käytetty, 655 krediittiä; ei uusintoja, lautanen+pöytä HOLD.

**Uusi tiedostohavainto:** aiemmin käynnistetty osan11 lootuskulhon vienti valmistui viiveellä Downloads-kansioon. Se on kopioitu muuttumattomana T7:lle ja läpäisi teknisen portin. Nyt paikallisesti on9 osamallia, puuttuvat10,12,13,14. Uutta vientipainallusta, suojausmuutosta tai generointia ei tehty. Osan10 ERR_BLOCKED_BY_CLIENT-juurisyytä ei ole itsenäisesti todettu; odotan ohjeenne mukaisesti normaalia manuaalista vientiä.

Teekannun ja lootuskulhon geometriahyväksyntä kirjattu PT:n päätökseksi. Punaisen lasin läpikuultavuus jää Clauden Unity-materiaaliin, eikä sitä varten tehdä uutta Tripo-ottoa. #800:n tekstuurikorjauksia ei monisteta tässä sessiossa.

**Kevyt paikallinen työ:** muodostin olemassa olevista osista kaksi maljakko+jalusta-ehdotusta sekä ruukun ja teekannun kansi+runko-alikokoonpanot. Neljä GLB:tä läpäisee teknisen portin, kaikki osat ovat erillisissä solmuissa. Alkuperäiset pinnat, indeksit, UV:t ja kuvabytet on verrattu lähteisiin; vain osien sijainti muuttui. Ei uusia pintoja tai raskasta renderöintiä. Näiden visuaalinen sovitus, keltaisen jalustan sävytys ja korjatut tekstuurit ovat kesken, joten kyse ei ole valmiista pelitoimituksesta.

Paikalliset tiedostot:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kahdeksan-esinetta-20261021/assembly-review-v1/`
(`ASSEMBLY.json`, GLB:t, `SHA256SUMS`, `technical-gate.json`, `LAHTEET.md`).

**Vastaanottotavan täsmennys:** jokaisessa osassa on3 sisäistä pintakarttaa. Kolmen osan ruukkuryhmä olisi9 karttaa ja neljän osan tee-/lasiryhmä12 karttaa, mikä ylittää sopimuksen8kuvan rajan perGLB. Ehdotan osamallipankkia ja kokoonpanon sijoitusreseptiä, joista Claude tekee prefab-ryhmät ja käyttää samaa jalustaa/kuppia instansseina. Näin kartat ja erillinen kaatuminen säilyvät ilman tarpeetonta uudelleenleivontaa. Vahvistakaa tämä vastaanottotapa tai ilmoittakaa, jos yksi yhdistetty GLB perryhmä on ehdoton vaatimus. Jatkan sillä välin sovitusta ja odotan puuttuvia vientitiedostoja/tekstuurikorjauksia.

Seuraava varsinainen toimitus on pyytämänne kahdeksan koottua ryhmää, kun avoimet vaiheet ovat valmiit. En merkitse nykyisiä tarkistusversioita vastaanotetuiksi pelimalleiksi.
