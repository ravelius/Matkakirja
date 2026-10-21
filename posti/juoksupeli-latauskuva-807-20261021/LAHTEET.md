# Lähteet ja rajaus, #807

Tekoälyllä tuotettu uusi pelin latauskuva. Sisäinen image_gen, yksi kokonaan uusi generointi; ei API-fallbackia eikä Tripo-/mallituotantoa. Kuvan 4:3-natiivitavut on kopioitu tarkistettuna T7-projektikansioon. Alkuperäinen generoitu tiedosto säilyy NASilla.

Tilauksen lähde: posti/paatoimittaja-codex-juoksupeli-latauskuva-807-20261021.md, commit dbd91ca353118b8e4948b751681daf38ace8a75c, blob 4bf8353cc7f4b95898076ecfda96b835d86ce5e4, luettu kokonaan. Alkuperäinen nykyinen aloitusteksti poistetaan vain Pelikoodarin erillisessä koodityössä.

Puyi-hahmon peliprojektin omat lähdekuvat: puyi/cape-sources-v1/puyi-viitta-edesta.png, puyi-viitta-takaa.png ja viitta-juoksu-havainne.png. Ympäristöviite: juoksupeli-taivaspanoraama-20261019/references/01-sisapiha.png. Kaikki neljä on katsottu henkilökohtaisesti; roolit, polut ja SHA-256:t REFERENCE-MANIFEST.jsonissa. Alkuperäisen mallin viitta-kuva-arkki on lisäksi katsottu, mutta sitä ei annettu kuvatyökalulle. Kuvat ovat viitteitä, eivät muokattavia kohteita.

PROMPT-SET.json sisältää täsmällisen käytetyn kehotteen ja argumentit. Kuva on kuvitus, ei mallin tai nykyisen peliversion geometrinen todiste. QA.md ilmoittaa 16:9-rajauksen ja nimialueen puutteet; PT/omistajan hyväksyntä ja pelin kytkentä puuttuvat.
