# Karttaseppä: luovutus 5.11.2026 klo 23.29 (KS)
Syy: pehmeä raja 28 %, luonteva tauko, koska Mac-vuoro on JU:lla (7.37). **Voittaa -2207:n ristiriidassa; -2207 on tausta (sävy, vahtiosumat, työjono).** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 1df82634d. Python `/opt/homebrew/bin/python3`. Testit `/bin/bash <W>/Kartta-testit/kaanna.sh PariisiKallistus`.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Oma d24c48215 ohitetaan.
2. **Odota JU:n "ESIKATSELU NYT" ja linjan numeroa.** Pyydetty 23.2x. Aja: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh <W>/tyokalut/esikatselu.sh 1df82634d /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sk-pariisi-alustat-24p.txt ipad --batch`, lopuksi JU:lle (local_b4a7e82a-2522-437f-84ff-813401120931) LUKKO VAPAA + linja + kesto + kuvamäärä.
3. KK:n vastaus viestiin 23.2x. Viesti saattoi olla vielä jonossa. **Kuittaa Codexille ja Tripolle vasta KK:n sanan jälkeen.**

## AJON TULOKSET (5 kuvaa: invalidit-45-etela, riemukaari-45, pantheon-45, opera-45, grand-palais-45)
- Katso jokainen täysikoossa. Kuvat heti KK:lle, kopio PT:lle (2.214).
- **Tummuus:** toistuuko Riemukaari 45° yötummana ajon 22.14 tavoin (lokit/esikatselu-20261105-221413)? Vertaa `globaalit`, `valokeila tila`, `valo tila` ennen kuvaa ja sen jälkeen (unity.log). Toistuu = syy selvitettävä tilariveistä; ei toistu = sano se, älä väitä korjautuneeksi. Epäily ei todistettu: `_keilaHamaryys`.
- **Katto:** sävy rungon rinnalla (Tripon kuvassa katto harmaampi), saumat, reuna 45°:sta, ruudukon välke. Runko säilyi ennallaan: `Savy` 1,26/1,33/1,15 koskee myös kattoa.
- **Alustat:** sauma kartan kadun kanssa ja kiveyskuvion voimakkuus. Grand Palais: rantatie näkyy yhä (vanha 0906b3c15 poisti laituripuolen juuri siksi), nurmen ero kadun takaiseen puistoon. Invalidit: etelän puutarhat, lattian ja kiveyksen liitos.

## TEHTY TÄLLÄ VUOROLLA
- **Eiffel 24p:** uusi lähtö `_tyo/codex/pariisi-sarja-20261105/eiffel-24p/`, posti d24c48215. Tehty `nahtavyyssarja/tyokalut/eiffel-24p-maski.py`. Kaksi korttelia lisää (koillinen, lounas; 2,25 ha), raja kadulla tai rannalla 97 %. Vara jalkojen kulmista: itä 48,7, etelä 47,0, länsi 42,8, pohjoinen 50,6 m. **Odottaa Codexia:** `posti/codex-karttaseppa-alustat-24p-eiffel-20261105/`. Asennus eroaa muista: `eiffel-pohja.png` on nyt kiveysalusta (eiffel-alusta.py); käytä `asenna-24p.py eiffel <uusi> eiffel-24p/maski.png <R>`. Kehys 1536 × 1024, Leveys 1690 ennallaan.
- **Vastaanotto:** kuuden alustan SHA täsmää, parit katsottu, ulkopuolella 0 muuttunutta pikseliä. `_tyo/karttaseppa/alustat-24p/` (`pari-*.png`, `uudet/*.png`, Tripon kuvat). Tulos KK:lla ja PT:llä.
- **Asennettu kokeena 1df82634d:** Panthéon, Opéra, Invalidit, Grand Palais. `asenna-24p.py` laskee nyt kertoimen vain kiveyksestä (a.sum > 560), koska Grand Palais'n alueen mediaani oli nurmea. Ei junassa. Ei nähty pelissä.
- **Sacré-Cœur ja Montparnasse:** alustat `alustat-24p/uudet/`, ei asennettu, koska malleja ei ole kartalla. Sacré-Cœurin nurmi venyi ja pyöristyi (Codexin QA ei PASS); KK päättää.
- **Riemukaaren katto v2 (Tripo 1fadb6491):** `GlbLukija` kokoaa primitiivit yhteen ja käyttää vain ensimmäisen materiaalin kuvaa, joten katon värit olisivat tulleet väärin. `sarja24-asennus/riemukaari-katto-peliin.py` leipoo värit atlaksen vapaisiin 8 × 8 -lohkoihin (8 väriä) ja osoittaa katon UV:t niihin. Vakio-UV ohittaa normaalikartan kuten Invalidien lattia. Atlaksen muu osa JPEG-uudelleenpakkauksessa keskivirhe 0,17. Normaalikartta ennallaan. **Kommentti `Nahtavyysalue.cs`:ssä sanoo yhä "raaka 37 648 kolmiota"; päivitä seuraavassa koodimuutoksessa.** Tripolle ei vielä mitään: mallin hyväksyntä KK:lta.

## ODOTTAA
- Codex: Eiffel 24p. Tripo: kuittaus katosta KK:n jälkeen. Codex: 6 alustan kuittaus KK:n jälkeen.
- Sovitut parit: Eiffelin vanha pari `Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261105/eiffel-maa-puuttuu-2132.png`.

## TYÖJONO (kuten -2207, tärkeysjärjestyksessä)
1. Sävyn syy ajosta. 2. Pystysauma (PT, -2128 kohta 2). 3. Sacré-Cœur pelissä (`sc-suunnitelma.md`), Montparnasse mitoista. 4. Katsepiste-koe (fb4379432, ei yhdistetä ilman omistajan sanaa). 5. Pont Neufin nimi `_tyo/karttaseppa/jono-pont-neuf-nimi.md`. 6. Marais: vain rajan varmistus NS:lle, kun kysyy.
**Yhdistettäessä:** NUI:n jousi (natiivi-ui/liikevahti-219 cbc744e21) voittaa PariisiKallistuksen rivillä.

## Opit
- Toimituksen primitiivit ja materiaalit tarkistetaan ennen asennusta: peli näyttää vain ensimmäisen materiaalin kuvan.
- Alustan kiveyskerroin kiveyksestä, ei koko alueen mediaanista: puistokohteessa mediaani on nurmea.
- `==` zsh:n silmukassa katkaisee komennon: käytä `---`.
