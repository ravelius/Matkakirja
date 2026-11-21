# Natiivisepän luovutus 5.11.2026 klo 17.58 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa -1655:n jonon (lepo päättyi). Muu -1655 pätee. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Lue Raamattu 7.47:n rivi; luvut 6, 9, 10 ja 12 luin tällä vuorolla vain osin. Remote päälle.
Uusi cron "4 9 * * *" unity-julkaisut.py (tilinvaihto.md kohta 2; nollaus vie sen). T7-Monitoria en käynnistänyt uudelleen (PT: uusi vain cron); pid 58484 oli käynnissä 17.5x, ei poistoja ennen PT:n lupaa.

## Erä (PT 17.5x, omistaja 17.52, kuumailmapallon kierros Pariisissa, pieni iPad, MK kehitys 9e8c8ab1e)
PT:n sanat: "1) Kartta säpsähtää itsestään nopeasti sisään ja ulos (reilusti alle sekunti). 2) Napit keskellä alhaalla liikkuvat itsestään ylös ja alas. 3) Aloituslähestyminen on liian hidas."
Tavoite: "pelaaja lähtee heti, pallo laskee nopeasti Notre-Damen luo lyhyen tervehdyksen aikana ja kertomus jatkuu ilman taukoa." Tervehdys sanatarkasti: "Tervetuloa Pariisiin, aloitetaan kaupunkikierros. Ensimmäisenä Notre Dame". "Kartta ja napit pysyvät paikoillaan, kun pelaaja ei koske."
"Toista vika Macilla (kameran etäisyys ja nappien paikka ruuduittain lokiin), ei iPad-ajoja (2.209); ajot JU:n vuorolla. Äänen tekee Äänittäjä, sovi tiedostonimi sen kanssa. Pari minulle, ei junaan."
Omistaja 17.58 (Raamattu 10.5, sitova): jokainen Mac-ajo ratkaisee yhden kysymyksen; pyynnössä JU:lle rivi "mitä tämä ratkaisee" ja enintään noin 5 kuvaa; ei verrokkia, jos vanha kuva kelpaa; korjaukset samaan ajoon; ei ajoa, jos testi tai loki riittää.

## Tila
Haara natiiviseppa/pallo-aloitus-219, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Kärki 9e064504d = 9e8c8ab1e + ruutuloki (komento `opas ruutuloki 0|1`, rivit "MATKAKIRJA opas ruutu": et, kall, suunt, fov, cam, ala, napitosuus, napitala, komp, ylos, laatat). unity-tarkistus 0 virhettä; tarkista.sh:n valovahti valittaa Komennot.cs, Nahtavyysalue.cs ja NotreDameKirkko.shader, jotka tulevat pohjasta 9e8c8ab1e, ei tästä erästä.
Saapuminen-porras-219 (379991bd6) EI ole tässä haarassa; 9e8c8ab1e ei sisällä sitä.

Odottaa:
1. JU: ajo natiiviseppa-pallo-toisto-9e064504d KÄYNNISSÄ L1:llä, alkoi 18.00.43; JU lähettää rivin, kun se loppuu. Tulos /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261105-180043/loki.txt, ei kuvia (10.5, PT: loki ruuduittain riittää, kuvia vain, jos loki ei ratkaise). Tarkistus 18.05: yksi "opas ruutu" -rivi, ei vielä tulosta. Skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pallo-aloitus/sk-pallo-aloitus.txt, koko 2420,1668,0,40,2420,1580,2,1. Muokkasin skenaariota 18.00.57 (4 kuvaa pois, loppuodotus 30 s), 14 s ajon alun jälkeen; loki kertoo, kumpi versio luettiin. Koko on oma arvio 11 tuuman iPadista, laitetta 00008142 ei tarkistettu. Skenaariota ei ole aiemmin ajettu; jos se kaatuu, JU ei toista ajoa.
2. Valoseppä (local_3b36fe96-0199-4b17-9eb4-46a882ce7399; PT 17.5x: äänet tällä kertaa sillä, ei Äänittäjällä): ääni valmis, kesto_s 5,911 (puhe alkaa 0,12 s kohdalla, loppuhiljaisuus 0,25 s). Sovittu nimi opas/esittely-v1/aanet/pariisi-tervehdys.mp3 + pariisi-tervehdys.ajat.json (avauksen kaava, tools/opas/tee-aaniajat.mjs). Otto ei vielä omistajalla, joten kesto voi muuttua. Vienti vasta KK:n kuittauksella. PT: lähestyminen ei odota ääntä; jatka mittausta 9e064504d:n jälkeen.
3. Koodissa ei vielä viittausta pariisi-tervehdykseen; lähestymisen muutosta (Suunnitelma 3) ei ole aloitettu.

## Mitä koodista nähtiin (EI mitattu; viat eivät ole vielä toistuneet)
- Lähestyminen, kesto koodista: EsitysAvausIstunto soittaa avauksen pariisi-avaus.mp3 (kesto_s 18,8 datassa, opas/esittely-v1/pariisi.json), mahdollisen opastuksen, AvausLepoS 2,5 s, sitten Kaupunkikierros; lasku vähintään AvausSuoraS 24 s (OpasSilmukka, AsetaSuoraLasku), jos lähtö on avauskehyksestä; yli 2 km:stä AvausLaskuS 18 s. Kerronta alkaa PalloPuheEnnenS 5 s ennen saapumista. Lisäksi siirtoruutu (enintään 20 s) ja AvausTaukoS 2,3 s. Mahdollinen nykyintro (AloitaIntro, Pariisi) kuuluu ajasta, tarkista lokista, ajetaanko se tällä polulla. Paikalliset vakiot koskevat kaikkia kaupunkeja, joten muutos rajattava Pariisiin (omistaja puhui vain Pariisista).
- Napit, oletus: OpasValikko.EsitysAla sijoittaa esitysrivin PalloKori.KompassiNorm.yMax:n mukaan 4 pt:n portain (kommentin mukaan juuri ettei väräjä); keinuva kompassi voi silti vaihtaa porrasta edestakaisin rajan kohdalla. Sama arvo menee NapitYlaOsuus-arvoon (pyöristys 0,01).
- Kartta, oletus: NapitYlaOsuus ja kompassi → KatseValiYtimelle → PysahdysKatse.AlaOsuus (hystereesi 0,015) → OpasKuvaus-kehys. Jos arvo vaihtuu rajalla, kehys voi vaihtua. Ei tiedetä, liittyvätkö viat 1 ja 2 toisiinsa; säpsähdys voi tulla muualta (fov, kori). Ruutuloki ratkaisee: katso et/fov-hypyt samoista ruuduista kuin napitala- ja ala-muutokset.

## Suunnitelma
1. Lue ajon loki: säpsähdysten ja nappihyppyjen ruudut, mittari erottaa toimivan tilan (9.7). Jos ei toistu Macilla, sano se PT:lle eikä korjata arvaamalla.
2. Korjaa syy, sitten sama skenaario uudelleen JU:n vuorolla. Kartta ja napit eivät saa liikkua ilman kosketusta.
3. Lähestyminen: Pariisissa tervehdys avauksen tilalle ja lasku tervehdyksen aikana, kertomus heti perään; tervehdyksen ääni Äänittäjältä, kesto siitä. Kameraliikkeille kameratesti (9.1), PalloLiikeTestit ajettava.
4. Pari PT:lle, ei junaan. Ei iPad-ajoja.

## Muuta
Zsh: `$C:Assets` tulkitaan muuntimeksi, käytä `"${C}:polku"`. tarkista.sh muuttaa aina tyylikirjan kolme tiedostoa: git restore ennen committia.
