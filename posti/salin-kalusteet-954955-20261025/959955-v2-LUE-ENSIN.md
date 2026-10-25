# Salin kalusteet delivery-v2 — korjaus959 ja kaappi955

Penkki on korvattu yhdellä uudella Tripo-otolla #958:n umpipaneelikuvasta. Uuden penkin etu-, sivu- ja takapaneeleissa ei näy hylätyn v1:n ristikkoreikiä tai roikkuvaa helmapalaa. Tuottajan neljän suunnan kuvakatselu tehty. PT:n lopullinen hyväksyntä ja pelissä tarkistus odottavat.

Kaappi on delivery-v1:stä täsmälleen muuttamattomana (SHA256 e4e8284a80ccedf12ac93dcc6f66cd8688d0845f08dc1af733e9178a76762979). PT vastaanotti kaapin; Lavastajan portti ja pelikuvapari seuraavat. Tässä paketissa kaappia ei generoitu tai muokattu uudelleen.

| Malli | Leveys × syvyys × korkeus | Kolmiot | Tekstuurit |
|---|---|---:|---|
| salin-penkki, korjaus959 | 1,60 × 0,45 × 0,50 m | 2560 | PBR1024 |
| salin-kaappi,955 ennallaan | 0,90 × 0,45 × 1,20 m | 2058 | PBR1024 |

Metrit, +Y ylös, +Z eteen, pohjakeskipivot y0, root scale1. GLB sisältää kartat; samat PNG-kartat myös erillisinä. Yksi materiaali/primitive per malli. Ei alfa/rig/animaatioita. Efektiivinen karheus vähintään77/255 eli noin0,302. Mitat paistettu verkkoon akselikohtaisesti, normaalit muunnettu ja normalisoitu, topologia/UV säilyvät. PLACEMENTS ei kuulu tilaukseen.

## Katselu ja rajoitukset

Penkin koristeet ovat lähdekuvaa pehmeämmät ja kannen nurkissa/helmassa on hieman epätasaisuutta. Ei näkyviä läpireikiä paneeleissa. Verkon sijaintihitsauksen diagnostiikassa yksi komponentti,3 avointa ja4 ei-moniston reunaa; ei väitettä täysin vesitiiviistä topologiasta. Tämä diagnostiikka täydentää kuvakatselua. Mahdollinen tarve korjaukselle arvioidaan pelin kamerasta, ei automaattisella lisätuotannolla.

Kaapin vetimissä lievää epäsymmetriaa ja jalkojen pohjissa pientä rosoisuutta, kuten v1-arviossa. Staattisiin esineisiin ei lisätty riggausta tai lähikuvaan tarkoitettua viimeistelyä.

Arkit on laskettu toimitus-GLB:istä harmaalla taustalla tasaisena perusvärinä. Ne eivät ole pelin kuvia tai lopullinen PBR-valoarvio. Lavastaja ajaa portin, sijoittaa tilauksen954955 mukaisiin seinä/pylväsväleihin, tarkistaa lattiaosuman ja materiaalit sekä tekee avoimet-v37-havainne/pelikuva-parin PT:lle. PT arvioi lopullisen käyttökelpoisuuden pelikuvasta. Vastaanotto, PT-hyväksyntä, integraatio ja julkaisu kirjataan erikseen.

Vanha delivery-v1, hylätty penkki ja kaikki alkuperäiset säilyvät. Uusi penkki käyttää yhden valtuutetun uusinnan:45krediittiä, saldo18800. Kaluste-erä yhteensä135krediittiä. Ei muita uusintoja. Lähteet ja jobid:t LAHTEET.md:ssä.
