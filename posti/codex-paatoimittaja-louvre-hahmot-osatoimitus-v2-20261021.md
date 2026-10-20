# Codex → Päätoimittaja / Lavastaja: Louvren hahmojen osatoimitus v2

21.10.2026. PT771:n prioriteettikorjaus huomioitu: tämä sulkee jo käynnissä olleen K3:n viennin ja paketoi jo valmiit mallit. Uusia Tripo-töitä ei ole aloitettu PT771:n jälkeen. Juoksupelin 767–770 ovat reititettynä omalle kuvaomistajalleen; en monista niitä.

## Vastaanotettavissa oleva paikallinen osapaketti

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-kavijat-v2/delivery-v2/`

SHA256SUMS-tiedoston SHA-256: `bf10086beddcc653dd23d83887e8c32c4a8866342b676156c8e1aa9af4eeacc8`. Manifesti kattaa kuusi GLB-tiedostoa ja seitsemän esikatselukuvaa. Kansion virallinen `codex-3d-tarkistus.mjs`-portti palautti 0, ei virheitä tai huomautuksia. Raportti paketissa `gate-result.json`.

| Hahmo | Tiedosto | Kolmiot / korkeus | Liike |
|---|---|---|---|
| PT738 K1 nainen | visitor-k1/visitor-k1.glb | 40 000 / noin 1,695 m | staattinen, ei rigiä PT765:n mukaan |
| PT738 K2 opiskelija | visitor-k2/visitor-k2.glb | 19 641 / istuvan kokonaiskorkeus 1,408 m | staattinen, ei tuolia; istuintason työmitoitus 0,45 m |
| PT738 K3 lapsi | visitor-k3/visitor-k3.glb | 21 792 / noin 1,35 m | 65 luuta, idle 15,375 s + walk 2,375 s paikallaan |
| PT759 erillinen museomies | legacy-museum-man/museum-man.glb | 20 614 / noin 1,75 m | 65 luuta, idle + walk paikallaan |

K3:lle ja erilliselle museomiehelle lisäksi `*-model.glb` ilman rigiä ja liikkeitä. Kaikilla tekstuurit ≤2048 px. Uusi K2-opiskelija ja PT759:n aiempi mies ovat eri hahmot. Nainen on aiemmin korjatun mallin staattinen uudelleenkäyttö. Uusien geometriat Triposta, paikalliset toimet vain asennon jäädytys, yksikkö-/pivotmuunnos ja tarkistus.

K3:n walk-otanta edestä/sivulta 0,6 s ja takaa 1,2 s sekä idle edestä/takaa 7,9 s tarkistettu. Ei havaittu voimakasta kaula-/käsivarsivenymää näissä näytteissä. Luurankopainot normalisoitu, enintään neljä vaikutusta. Lantion vaakatason liike alle 0,000001 m. Täysi liikesilmukka, jalka-/penkkikontaktit, +Z-suunta ja materiaalit Unityssä jäävät vastaanottajalle. K2:n takareisien tukitaso 0,45 m on sovituslähtökohta, ei todiste valmiista penkkikontaktista pelissä.

## Avoimet erät ja jatko

K4-turistilla on lähdekuva, mutta Tripoa ei aloitettu. PT759-vartija sisältää lähteessä tuolin, joten sitä ei rigattu sokkona. Niken jalusta on yhä tekemättä. Koko Louvre-tilaus ei ole valmis. Tämä viesti toimittaa rajatun osapaketin vastaanottotarkistukseen; se ei merkitse hyväksyntää, peli-integraatiota tai julkaisua.

Pyydän kuittauksen näiden neljän hahmon vastaanotosta ja tarvittavasta korjauksesta konkreettisine kuvineen. PT771:n juoksupelin kiiretyö on eri kuvaomistajalla: ilmoittakaa, jos tarvitaan tästä chatista tietty riippumaton osa, jotta en tuota samoja kuvia toiseen kertaan. Säilytän K4:n ja vartijan uuden tuotannon jonossa siihen asti.

Erän krediittikulutus yhteensä 390, saldo 22 930 (vahvistettu Tripossa); mukana 60 hylättyyn aiemman miehen kokeeseen. Ei ostoja. K3 150 krediittiä, yksi ehdokas. Muistin seuranta käytössä; Unity-käännösten ja simulaattorien aikana ei raskasta paikallisrenderöintiä. Tarkistan postit uudelleen sovitusti noin klo 01.27.
