# Julkaisija: luovutus 4.11.2026 klo 22.16 (Macin kello) – konteksti 30 %

Rooli: Julkaisija (JU). Korvaa -20261104-1912:n ALOITA- ja jono-osat; aiemmat OPIT voimassa. Jonoloki: T = /Users/Shared/Claude/julkaisija-tyokalut, T/jono-20261103-ilta.txt. Sano aina, jos katsoit vain osan kuvista.

## ALOITA TÄSTÄ
1. Tarkista ketjut: ps -axo pid,etime,command | grep julkaisija-tyokalut. Odotetut: tf-koe-mittaus 48807 → vs-viivatb 48816 → ns-astc 48821 → pk-hajonta 48827. Kukin odottaa edellisen pid:n loppua; jos pysäytät yhden, käynnistä sen perässä olevat uudella pid-argumentilla, muuten ne kisaavat lukosta.
2. Viritä Monitor: tail -n0 -F T/tf-koe-mittaus.log T/ns-astc.log T/pk-hajonta.log T/vs-viivatb.log | grep -a --line-buffered -E 'TF-KOE|EI RIVIÄ|NS-ASTC|VALMIS normaali|^AJETTU |VS-VIIVAT|VAHTI|PK-HAJONTA|^VIKA|vs-muisti-z10k60 AJETTU'
3. Rivit alla.

## iPAD-JONO (ketjussa; kaikki käännetty)
1. TF-koemittaus T/tf-koe-mittaus.zsh a5323cf4e (60bd5c356 ABBAAB + kartta z10 k60 kummallakin, muistivahti PÄÄLLÄ; VIKA on tulos, PT). Tulokset T/tf-koe-tulos.txt, kansiot lokit/julkaisija-tfkoe-<sha>-<n>, kartta julkaisija-tfkoe-kartta-<sha>. RIVI KK + PT ENNEN LÄHTÖKORTTIA: palatsin muisti, kartan muisti, latausaika. "uudestaan s" = komento → ensimmäinen kameraväli, 1 s tarkkuudella; kehityskäännös, ei Release. 60bd:ssä ei muistivahtia (tuli 3.11.): muisti lasketaan muisti-tarkka.log:sta. Tarkista a5323:n konsolista "muistivahti: päällä". 60bd:n kaksi ensimmäistä kansiota -mitaton-* ovat mittarivian jäänteitä.
2. VS viivat 1b/2b a5323cf4e T/vs-viivatb.zsh, MUISTIVAHTI POIS PT:n luvalla vain tähän; ketju palauttaa ja varmistaa (VAHTI paalle varmistettu). Varmistusrivi PT:lle. Kansiot lokit/julkaisija-piirto-viivat-{1b,2b}-a5323cf4e → VS (rivi menee VS:n seuraajalle). avaus nyt lähetetään erän perään, kuvat ~1–2 s avauksesta.
3. NS astc 9ca48d7a2 T/ns-astc.zsh: ajo-muisti + sk-parit-laite samassa lukossa, runko takaisin. Rivi NS: kansio lokit/natiiviseppa-normaali-astc-9ca48d7a2 (parit/ + kuvajako.txt) ja AJETTU-rivit.
4. PK sarja T/pk-hajonta.zsh: hajontapari → PK:n sarja.zsh, noin 50 min, runko takaisin. Rivi PK: pk-hajonta.log:n s1–s3- ja juoksu-rivit.
5. EI VIELÄ KETJUSSA: VS suomi-syy 2d8ec025c (linssiseppa2/suomi-syy, natiivi-backup), _tyo/linssiseppa2/pariisi-tyyli/striimi/suomi/sk-suomi-syy.txt, 6 kuvaa, viivojen 1b/2b jälkeen (ei ohita niitä). Tarvitsee kääntämisen. Rivi VS: kansio, konsolin rivit "pohja pyyntö" ja "elävä pyyntö", muistiluku. Pohjana vs-kytkin.zsh (rivi kerrallaan), muistivahti päällä. Kerro VS:lle, että PT on jo antanut 1b/2b:lle luvan.

## TF-KOE, OMISTAJAN KORTILLA (EI LÄHTÖÄ ILMAN)
- Komento, kun kortti tulee: gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true -f versio=1.1 -f ordinaali=218 -f build_numero=218 -f proto_ref=<täysi a5323cf4e-sha> -f sisainen_ryhma=true. Ei tf-kaynnista.sh:ta (ketju vie ulkoiseen). Tarkista lokit/testflight-ordinaali.txt ennen. Luettu koodista, ajamatta.
- Runnerit käynnistetty 21.18 PT:n luvalla; olivat poissa 3.11. 18.51 lähtien. Yöajo: ennen klo 06.00 alkaessaan veisi masterin e51c33e0f (BUILD 209) sisäisille numerolla 218/219; ainoa suoja on 06.00-raja. PT tietää. Ajastusta ei muutettu.
- +6 s lähde: lokit/pk-muistipiikki-219/TULOS.md (9f8d2d13f, 672f:ssä, ei 60bd:ssä; KK).
- Omistajan laite: VS:n oikaisu: omistaja kokeilee TF:stä; asennus/lähtö vain kortilla.

## TULOKSET
- fc3fcb0bd palatsin avaus, lontoo, avaus 1, tapa 1: muistivahti VIKA 4098 ja 4137 Mt (lokit/julkaisija-piirto-viivat-1-fc3fcb0bd-hylatty-2143, -vika-2146). Syy auki, PT + VS tietävät.
- Kytkin fc3fcb0bd 6/6, 3571 Mt, VS kuittasi. Viivat fc3 12/12 mutta myöhässä (VS). PK lämmityskoe lähetetty. NS muistikuva lähetetty. VS offline2 lähetetty.

## OPIT
- Komentojen pysähtyminen ja devicectl copy -virheet samaan aikaan: katso konsolista "muistivahti: VIKA" ennen muuta. VIKA ohittaa komennot; lähetys voi epäonnistua, kun peli poistaa tiedostoja.
- Esikatselun odota-maailma, odota-peli ja kuva3d eivät ole laitteella. Tarkista VS:n skripti ennen ketjua; erä odota + kuva samaan komento.txt:hen.
- 60bd ei kirjaa LentoAlkaa- eikä peittokarttarivejä; ei lontoo-kylma-komentoa, ei muistivahtia.
- Ketjun pysäyttäminen: tapa lapset ensin ja tarkista, ettei keskeytynyt funktio jatka seuraavaan vaiheeseen. Kansion jälkeen uudelleennimeä, ettei väärä muistiluku jää. Kun lukot ovat vapaat, ketjun uudelleenkäynnistys on helpointa odottaessa.
- Monitor-tail alkaa nyt-hetkestä: tarkista erikseen jo valmistuneet lokit.
