# Natiivisepän luovutus 5.11.2026 klo 22.02 (konteksti 32 %, 7.37)

Korvaa -2101:n. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; Raamattu 7.41; polku: muisti unity67-paivitysseuranta).

## Seuraava työ
Ei uutta jonossa. Odottaa KK:n ja PT:n vastausta Ateenan ajoon ja kameran havaintoon (Avoimet 1). Jos jono on tyhjä, rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## Tehty tässä sessiossa (haara natiiviseppa/pariisi-aloitus-219, ei junassa, junaan vain PT:n kautta)
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, puhdas. Repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, peili natiivi-backup peili/proto/natiiviseppa/pariisi-aloitus-219. Kärki 30fdefd98.
- df7cc3e0c: omistajan päätös 21.02: kaikissa aloituskaupungeissa ei luentaa eikä merkintää alkulennon saapumisella. KaupunkiIntro.AlkulennonKaynti; LivianPaljastus sarja UniSarja, Alku/Loppu pois; EnsisaapumisenLykkays aina alkulennolla (ei Ohita esittelyt); varakutsu ja kartan odotus perivät luennan. Ajo Macilla: lokit/natiiviseppa-aloitus-ateena-df7cc3e0c: intro 18 s, sarja 1, -4, 3, -1, 4, -3, ei luentaa, kortti tyhjä. iPadilla ei ajettu; Tukholmaa ja Kööpenhaminaa ei ajettu.
- 648e932ac: Äänimuistivahti, TervehdysJaLasku perusteltu (vika haaran 7d719ae76:sta; JU:n runko 94f7eb0e4 2/2).
- 30fdefd98: PT:n siirtämä: esityksen hidas kuva ei putoa. EsitysKuvaJono (Ydin/Kierros): järjestys, seuraava vähintään 1 s myöhässä tulleen jälkeen, Introesitys.OdotaKuvia: loppu odottaa enintään 6 s (omat arviot). Yli 6 s:n latauksella viimeinen voi jäädä pois; kerrottu PT:lle. Ei ajettu. PT: "ei omaa ajoa, seuraavaan yhteiseen".
Testit kärjessä: Linssit 2248/2248, unity-tarkistus 0, kielivahti ok. Kartta LiikeLaatat ei ajettu (Karttaan ei koskettu).
Esityskuva: 6 s:n raja kelpaa (KK, PT); yli 6 s myöhästyneen kuvan ilmestymistä kartalle ei tehty, koska se vaatisi erillistä työtä esityksen sulkeuduttua.


## Avoimet
1. Ateena: kamera siirtyy lähinäkymästä koko Kreikan näkymään noin 1 s Pulun alusta (unity.log rivi 2706 "saapuminen: GRC Molempiin", b2 vs b3). Pariisin ajossa ei samassa kohdassa. Syy todentamatta; laukaisija on PalloKierto.SaapuminenAlkaa, kutsujaa ei löydetty. Kerrottu KK:lle (viesti oli jonossa 21.4x). Vanhassa kulussa arvio: sama tapahtui luennan jälkeen (muisti esikatselu-uusi-peli-palauttaa-kameran, Pariisi), nyt luentaa ei ole; ei todennettu Ateenalle.
2. Liikevahti ja valovahti hylkäävät haaran muita tiedostoja (Nahtavyysalue, Nimikerros, PariisiKallistus, MalliKyltit; Komennot, NotreDameKirkko); alkuperä selvittämättä. tarkista.sh pysähtyy valovahtiin, joten sen loput tarkistukset eivät aja; tarkista.sh muuttaa tyylikirjan kolme tiedostoa: git restore ennen committia.
3. PT:n tiedoksi: NUI:n e4b376546 ja tämä haara törmäävät Nimikerros.cs:ssä, SaapumisKuvat.cs yhdistyy.
4. Edellisestä -2101:stä yhä auki: Tuileries'n pystysauma (kadut katkeavat, syy auki, ehdotettu KS:lle); Eiffel ja Riemukaaren kyltti sumun yläpuolella kierrossa; iskulauseen näkyminen todentamatta.

## Skenaariot
/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-aloitus/: sk-aloitus-ateena.txt (korjattu ajon jälkeen, korjattua ei ajettu: oleta-uusi repliikille kirjautuu liian myöhään; siksi JU:n 2 PUUTE-riviä), sk-aloituslento.txt, sk-kartta-45.txt.

## Työtapa, tästä sessiosta
- kaanna.sh ajetaan sh:lla, ei zsh:lla (zsh ei jaa VIITTEET-muuttujaa). Testisuodatin: sh Linssit-testit/kaanna.sh Nimi.
- Vanha commit testattavissa: git archive + git init scratchpadissa; master e51c33e0f ei käynnisty (Unity b5 puuttuu).
- PT vaatii "ei tästä muutoksesta" -väitteeseen git blamen ja mainin tuloksen.
