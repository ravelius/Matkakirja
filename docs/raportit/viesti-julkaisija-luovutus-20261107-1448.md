# Julkaisija: luovutus 7.11.2026 klo 14.48

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1317:n; sen ja vanhempien OPIT, MALLIT ja YÖN SÄÄNNÖT ovat voimassa (git show 0e4337a20:docs/raportit/viesti-julkaisija-luovutus-20261107-1317.md; tapa ja vahdit git show 02e202344:docs/raportit/viesti-julkaisija-luovutus-20261107-1231.md).

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa. Katso myös /tmp/ju-portti.lukko (ks. OPIT).

## JONO (kuittaus tilaajalle; tarkista kuvat, md5 ja aika, älä arvioi)
L2 (portti, järjestys voi vaihdella):
- PK i10 bda125e21 pid 93257, ALKOI 14.47, 12 kuvaa, lokit/pelikoodari-lontoo-i10-bda125e21. Kuittaus PK:lle.
- NUI elämä 3 488a0de09 pid 80606, kansio natiivi-ui-kartan-elama-3-488a0de09. Kuittaus NUI:lle (sama id).
- NUI kyltti-korjaus-1 053f58aff pid 79163, odottaa elämä 3:a, 7 kuvaa + tallenne. Ei junaan. Kuittaus NUI:lle.
- VS film3 37a2f9a0f pid 37275, ESIKATSELU_LAATU=Ultra. Kuittaus VS:lle: tulosrivillä laatutaso-Ultra-pakotettu pitää olla yli 0, muuten kerro. Ei junaan.
- LAV palkki 61afeb7f2 pid 97856, T/lav-palkki-jonossa.zsh, LAV:n aja-palkki.zsh, 2 ajoa à 8 kuvaa. Rivi LAV:lle, kun PALKKI AJETTU. Junan ehto (PT 14.26).
- NS julkisivu2 f3d680c47 pid 96342, odottaa film3:a ja i10:tä, 3 ajoa, lokit/natiiviseppa-julkisivu2-{paalla,pois,koodi}. Skripti tarkistaa päällä-ajon jälkeen "talot tila: palat"; 0 tai ei riviä = SEIS-rivi, pois ja koodi jäävät ajamatta, rivi NS:lle. Lisäksi kerro NS:lle, täsmääkö "talot: N palaa kansiossa". Kuittaus NS:lle; iPad vasta Mac-kuvien jälkeen. Ei junaan.
iPad järjestyksessä:
1. KS talot-yla 702f8b48d pid 208, T/ks-talot-yla-ipad.zsh, käännös L2, vahti PÄÄLLÄ, 3 kuvaa, lokit/karttaseppa-talot-yla-b8-702f8b48d. Tulosrivillä talot-tila. Rivi KS:lle. Ei junaan ilman sanaa. .app pois kuittauksen jälkeen.
2. KS kumpu 59319f789 pid 246, T/ks-kumpu-ipad.zsh, odottaa pid 208:aa, oma käännös L2, vahti päällä, 6 kuvaa per ajo. Kuittaus KS:lle sisältäen rivin "KS kumpu offline:". Junan ehto. .app pois kuittauksen jälkeen.

## SÄÄNNÖT TÄLTÄ VUOROLTA
- PT 14.1x: omien laitekäännösten .app pois heti kuitatun ajon jälkeen (rm -rf lokit/julkaisija-laite-218-<sha>/Matkakirja3D.app, tarkista ettei ajo käytä), EI runkoa d092f48cc eikä 2cba21a3e-kansiota. Levy alle 20 Gi: rivi PT:lle; siirron malli T/siirto-laitekopiot-1408.py (T7:lle linkillä). Muiden roolien kansioihin ei kosketa.
- Säde be723da7f ei junaan ilman PT:n sanaa.
- Vahti pois vain PT:n nimeämissä ajoissa; muisti80 ja seinä4/5 tehty, kaikissa palautus luettu laitteelta.

## JUNA 220: julkaisija/juna-220 = 61afeb7f2, natiivi-backupissa. Ei käännetty tässä kokoonpanossa.
Lisätty: 02516c056 usva (f86137fb4), 2ba7617a1 + 067210c0f kala-allas ja kukkaruukku (c6715510f), 0c3232522 muuriaukko (2410473bb), c94e6ce51 VS:n testi (61afeb7f2; Kartta-testit 703/703). Kaikki junarivit kirjattu.
OMISTAJAN PÄÄTÖS 14.46 (PT): juna 220 saa olla koko Pariisin sisäinen koeversio, kokeet mukana, vain sisäiselle ryhmälle. Ei lukitse. Ei lähtösanaa vielä: odottaa talot kauemmas -korttia, muurin palkkia ja boordia, Toweria, kumpua. Ei käännöstä viennille ennen PT:n VIE-sanaa. Kun runko on lopullinen, yöportti uudelleen (gh workflow run natiivi-yoportti.yml, lue vaiheet).
Tapa ja vahdit: -1231 rivit 18–19. Testit puusta: archive myös Kartta-testit ProjectSettings Linssit-testit/kultaiset/paketti/maarajat.json, git init, cd Kartta-testit, sh ./kaanna.sh.

## LEVY: 38 Gi 14.47. 15,4 Gt vapautettu 14.1x. Rajat: alle 20 Gi rivi PT:lle, ei uutta iso-kansioista käännöstä; alle 10 Gi ei käännöksiä.

## KUITATTU tällä vuorolla: LAV seinä4 ja seinä5 (seinä näkyy, LAV arvioi), NS vaihto2 4/4, NS muisti80 (kaatui 5120 Mt, signal 9, toinen ajo jäi; .app poistettu), PK i9, NUI elämä 2 ja kyltti-selvitys 1, NS julkisivu 1. kerta (peruttu, palat 0). PT:lle: b8-rivin voi kuitata.

## OPIT
- Portin läpi juuri päässeen ajon pysäytys (alle 60 s portista) tappaa myös portin taustasleepin, jolloin /tmp/ju-portti.lukko jää ja koko L2 seisoo. Pysäytyksen jälkeen: ls ja rmdir. Oma moka: L2-jono seisoi 14.35–14.47.
- Pysäytyksen jälkeen myös /tmp/matkakirja-kaannospalvelu-2.lukko ja Temp/UnityLockfile: poista, kun pid on kuollut ja Unity ei aja.
- Skenaario, jossa on tallenne-alku: mac-ajo.zsh kopioi vain kuvat, joten tallenteet jäävät esikatselu-kansioon. Skripti siirtää ne (malli ns-vaihto2, nui-kyltti-korjaus1) ja tulosriville tallenteita n/a. Tarkista grep -c '^tallenne-alku' ennen kuittausta.
- md5-eri alle kuvamäärän = kerro heti tilaajalle (julkisivu: 10/15 paljasti, ettei taloja ollut).
- zsh: ${s}:polku, ei $s:polku (:P on muunnin).
