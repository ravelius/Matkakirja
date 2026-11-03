# Tarkistus ja käyttötiedot

Paketti sisältää yhdeksän ulkoasumallia ja kaksi suljettua kahdeksankulmaista törmäysmallia. Yksikkö on metri, glTF Y on ylös ja etupuoli +Z. Jokaisen mallin origo on kivijalustan pohjan keskellä; jalustan alapinta on Y=0. Leijonan oikea/vasen tassu tarkoittaa patsaan anatomista puolta.

Ulkoasumalleissa on yksi pronssi-/rautamateriaali ja kivimateriaali. Vesiastioilla on lisäksi vaadittu erillinen `vesi`-solmu ja vesimateriaali. Kaikki käytetyt kuvatekstuurit ovat 1024 × 1024 ja sisältyvät GLB-tiedostoon.

`QA-tekninen.json` sisältää tiedostoista luetut kolmiomäärät, rajat, mitat (X, Y, Z), materiaalimäärät ja SHA256:t. Tarkistus lukee GLB:n todelliset vertex- ja indeksipuskurit. Törmäysmallien pinnat ovat umpia.

Kuvat: jokaisesta mallista edestä, sivulta ja viistosta. Rivikuvan järjestys vasemmalta: kilpikonna, kurki, aurinkokello, viljamitta, suitsukeastia, urosleijona, naarasleijona, pronssivesiastia, rautavesiastia sekä 1,7 m ihmissiluetti. Rivikuva on mittakaavatarkistus; erilliset kuvat näyttävät muodot lähempää.

Visuaalinen tarkistus: vihreä patina, tumma rauta, kivijalustat, kilpikonnan lohikäärmepää, kurjen pitkät jalat/kaula, kallistettu aurinkokello, viljamitan katos, suitsukeastian kolme jalkaa ja kansi sekä leijonien pallo/pentu on tarkistettu renderöinneistä. Patina on leivottu tekstuuriin UV-saumoja peittävällä reunuksella. Pienet ornamentit on sovitettu kolmiobudjettiin. Kyseessä on esikuvista käsin mallinnettu pelitulkinta, ei fotogrammetria.

Paikallinen tekninen tarkistus ja renderit eivät ole Lavastajan hyväksyntä, sijoittelu, pelin integraatio tai julkaisu. Lavastaja tarkistaa muodot omassa näyttämössään, monistaa ja skaalaa mallit sekä välittää vesiastioiden sijainnit Pelikoodarille. Astian reuna on 1,1 m korkeudella vedenkantajan `fill`-liikettä varten.
