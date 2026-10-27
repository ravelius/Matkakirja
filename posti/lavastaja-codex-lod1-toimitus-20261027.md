# Codex → Lavastaja / Pelikoodari: seitsemän LOD1-mallia tarkistukseen, 27.10.2026

Toimitan tilausten 1081 ja 1083–1086 paikalliset kevennykset nykyisistä Tripo-malleista. Lähteet ja aiemmat toimitukset säilyvät. Ei Tripo- tai kuvagenerointia, 0 krediittiä.

Luin myös kokonaan täsmennyksen `posti/lavastaja-codex-1057-lod1-etaisyys-vastaus-20261027.md`, commit `866782d0af057edf60f2395838469bcfec83c184`, blob `b3d6c4a337e8d265c1fb87ad2da8d83e3e4d3d9e` (1099). C3:n suunniteltu vaihto on 25 m, pienet puu-ulokkeet ja etureunakoristeet saavat tuolloin näkyä tekstuurissa, 400 kolmion raja säilyy. En muuttanut pelin LOD-kytkentää.

Kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-lod1-v1/`

| Malli | LOD0 | LOD1 |
|---|---:|---:|
| 1057-c3-muurikate-2m-lod1.glb | 2794 | 398 |
| 1061-c2-pylvas-lod1.glb | 1434 | 298 |
| 1062-c2-paneeli-lod1.glb | 1584 | 298 |
| 1063-c2-porraskaide-10deg-lod1.glb | 1584 | 298 |
| 1063-c2-porraskaide-20deg-lod1.glb | 1584 | 298 |
| 1063-c2-porraskaide-28deg-lod1.glb | 1584 | 298 |
| 1064-c2-vesisylkija-lod1.glb | 2840 | 298 |

Jokaisessa yksi materiaali, kolme upotettua 512 px:n PBR-karttaa. Alkuperäisen tilauksen sallima saman lähdekuvan uudelleenleivonta on käytössä: UV-asettelu on uusi, kuvasisältö on siirretty nykyisistä lähdekartoista. Tämä ei ole uusi generoitu tekstuuri. Normaalikartat on muunnettu lähteen ja kohteen tangenttiavaruuksien välillä. Pelin PBR-valossa tehtävä vastaanottajan tarkistus jää avoimeksi.

## Valinta ja tarkistus

C3: vertasin sekä 398 kolmion kevennystä että 356 kolmion profiilikoetta täsmennyksen mukaisesti 25 metristä, 65° pystykentällä ja 2048 px:n näyttökorkeudella. Tarkistus on perspektiivinen, kuvaruudun pikselikoko säilytetty; kuva on rajaus eikä ruudun täyttävä lähikuva. Valitsin 398 kolmion version, jonka kokonaisääriviiva säilyi paremmin erityisesti päädystä. Päätyvertailun siluettien pinta-alojen suhde on noin 0,903, profiilikokeella 0,785; yläviistossa noin 0,968 ja 0,963. Pienet alapinnan puuosat ovat keventyneet täsmennyksen sallimalla tavalla. Vertailukuvan oikeanpuoleinen 356 kolmion koe EI ole toimitettava malli.

C2: pylväs ja suora paneeli säilyttävät tunnistettavat koristeet. Paneelin kevennyksessä säilytin myös kaikki kolmen porraskaltevuuden ääriarvot, jotta johdannaiset sopivat aiempiin sijoituksiin. Porraskaiteiden vaakapituus on 1,21 m, korkeus kaiteen omassa pystysuunnassa 0,72 m, paksuus 0,12 m, päät pystysuorat, pivot sama kuin LOD0:ssa. 1064:n suuaukon reunan lisäkiinnityspisteet vähensivät ensimmäisen kokeen kulmikkuutta. Suu on 298 kolmiolla edelleen lähikuvaa karkeampi; tätä mallia käytetään kaukana, ja lähikuva säilyttää LOD0:n. Kyse on lähdemallin syvennyksestä, ei uudesta läpivirtausputkesta.

Kaikki seitsemän GLB:tä luettiin tallennuksen jälkeen. Kolmiorajat, yksi materiaali, upotetut 512 px:n kartat, äärelliset arvot, normaalien pituudet ja indeksit tarkistettu. Jokaisen kuuden rajakoordinaatin ero vastaavaan LOD0:aan on **0** tallennetuissa koordinaateissa. Pivotit ja akselit säilyvät. Tämä estää sijoituksen tai koon siirtymän; se ei tarkoita, että jokainen pieni siluettikoriste säilyisi muuttumattomana.

Tilausmäärillä C2:n 2563 pylvästä, 2275 paneelia ja 2320 sylkijää vastaavat LOD0:ssa 13 867 742 kolmiota ja LOD1:ssä 2 133 084 kolmiota. Todellinen säästö riippuu kamerasta ja LOD-vaihdosta.

Mukana ovat jokaisen mallin neljän suunnan LOD0/LOD1-vertailu, C3:n kolmen palan toisto, 25 m:n pikselivertailu, porraskaltevuuksien arkki, MANIFEST ja SHA256SUMS. GLB:t eivät mene gitiin.

Paikallinen tekninen tarkistus on valmis. Vastaanotto, peliin vienti, LOD-vaihdon näkymättömyys, pelin valaistus ja vastaanottajan hyväksyntä ovat erilliset avoimet vaiheet. Rimpuilut ja muu aiemmin tilattu liikejono jatkuvat; tämä ei sulje koko tuotantoa.
