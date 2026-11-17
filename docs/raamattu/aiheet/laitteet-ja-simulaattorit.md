# laitteet-ja-simulaattorit · vastuu JU · tarkistettu 12.11.2026

TAVOITE: Peli istuu jokaisen laitteen ruutuun, ja iPhonen asettelu on tehty sen omaa ruutua varten. Laitteita ja simulaattoreita käytetään säästeliäästi ja vuorollaan, eikä yksikään ajo häiritse omistajaa.

SÄÄNNÖT:
1. iPhonen ruskea yläpalkki on webiä matalampi ja ilman logoa: raha ja päivä vasemmalla, napit oikealla Dynamic Islandin korkeudella. Pystyssä palkki pysyy; vaakana se piiloutuu vieritettäessä, ja ⌄-nappi tuo sen takaisin. iPadilla palkki ei piiloudu. [R-4.28]
2. iPhonella linssin otsikko, valikko ja säätimet ovat Dynamic Islandin kummallakin puolella kaarevat kulmat huomioiden, ja napit ovat linssin teemaväriä. [R-4.30]
3. iPhonella Matkakirja-logo on avatun matkalaukun oikeassa yläkulmassa ja vie tekijätietoihin ja lähteisiin. [R-4.31]
4. Kaikki katsotaan ensin Macilla iPadin ja iPhonen ruutukoossa. Mac-ajo on lyhyt: yksi nimetty kysymys, pieni kuvalista; ei ajoa, jos testi tai loki riittää. [R-12.26] [R-10.5]
5. iPadilla tarkistetaan vain muisti, nopeus, kosketus ja koeversio. Iso iPad: vain KK:n nimeämä valmis kokonaisuus; rooli ei tilaa iPad-ajoa itse. [R-12.26] [R-9.11]
6. Koeversion löydös pysäyttää TestFlightin ulkoisen jaon; ulkoisilla pysyy edellinen käännös. [R-9.11]
7. PT:n kuittaama junan kärki jaetaan asennussivulle. Pieni iPad vain, kun tarvitaan kaksi rinnakkain. [R-2.217] [R-9.11]
8. Omistajan iPhonella ei ajeta, mitata eikä testata mitään; iPhone-kuvat Macilla iPhonen koossa. Iso iPad ajetaan vaakana, ellei kohde vaadi pystyä. [R-12.26] [R-9.11] [P-261117-51]
9. Roolit eivät käännä itse: käännös- ja simuvuoro pyydetään Julkaisijalta, ja työ alkaa vasta NYT-viestistä. Juna menee ensin, kolmatta käännöslinjaa ei avata, ja jaettua käännösinfraa muutetaan vain omistajan luvalla. [R-10.4] [R-10.5] [P-261116-15]
10. Simulaattoreita on neljä yhteistä, vuorolukolla yksi rooli kerrallaan; uusia ei luoda eikä vanhaa sisäistä sarjaa käytetä. Rooli sammuttaa ajon jälkeen vain omansa. Isolla iPadilla oma lukko, yksi ajo kerrallaan. [R-12.17] [R-12.16]
11. Ajot ovat äänettömiä eivätkä avaa ikkunoita omistajan näytölle; Macin oletusäänilaitetta ei vaihdeta. Ääntä tuottava oma ajo lopetetaan omalla PID:llä. [R-12.10] [R-12.13] [R-12.15]
12. Kuva-ajoja kaksi rinnan; kiireajo vie yhden kaistan. Sama sha eränä. Portti valvoo: yo-luokka (mittaus, pari, toinen laite) vain yössä, poikkeus vain vika tai omistaja viitteineen. [P-261115-kaistat] [P-261116-14]

EI VIKA:
- Vain iPadilla näkyvä vika löytyy vasta koeversion tarkistuksessa.
- iPhone-mittausta ei ole (ei avoin asia).

TEKOTAPA:
- Simulaattorit: proto-3d/tyokalut/simusarja.sh (sarja T7-levyllä). Ennen käännöspyyntöä proto-3d/Matkakirja-proto/tyokalut/tarkista.sh (virheitä 0).
- Mac-esikatselun linjat (mac-yleis.zsh), lukot, iPad-jonot ja muistivahdit: /Users/Shared/Claude/julkaisija-tyokalut.
- Muistiajo ja -raja: testit, suorituskyky-ja-muisti. Junan kulku: juna-ja-julkaisu.
