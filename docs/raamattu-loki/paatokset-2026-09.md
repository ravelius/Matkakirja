Raamatun (js/tyohuone-raamattu.js) juokseva päätösloki 20.9.2026 illasta eteenpäin — jatkaa lokeja paatokset-2026-08-24--09-03.md, paatokset-2026-09-03--09-14.md ja paatokset-2026-09-13--09-20.md. Uusi kohta lisätään loppuun komennolla `node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"` (otsikkoon aikaleima Suomen aikaa). Raamattuun jää vain voimassa oleva linjaus; sitä muutetaan vain kun sääntö muuttuu, ja vain Fable kirjoittaa siihen.

## KARTUSCHA 3 TEHTY (Pelikoodari 3ea7b1b6) (20.9.2026 klo 18.59)

Pienessa kartuschassa ei lippua; isossa lippu = otsikon versaalin korkeus (juurisyy: lipun em oli kortin fontti, ei otsikon; nyt 1cap otsikon koosta, alareuna perusviivalla); iso pienenee kotelon pointerdown/wheel-eleesta kortin ulkopuolella (kortti pointer-events:none, rajaus geometrinen). Savuke savuke-kartuscha-3 28/28 (390+1400), harvaan sarjaan kartuscha-poluilla. Testit 3752/1 - punainen oli dokumentit-testin codex-toimitukset.md, korjattu jaossa. Pelikoodari jatkaa varusteet-harmaa-eralla. Raamatun jako mergetty Fablen haaraan (ff46f88b): 983 -> 230 kt, CLAUDE.md paivitetty.

## KESKENERAISET VARUSTEET HARMAANA TEHTY (Pelikoodari 96fe72c6) (20.9.2026 klo 19.12)

Vertailu, maatiedot ja vesistot kantavat LINSSI.kesken=true; matkalaukku latoo ne omaan .linssi-liuskat-kesken-ruudukkoon ruudukon loppuun (44 px, grayscale, 62 % peitto), esikatselu ja aktivointi toimivat; yksikkotesti matkalaukun-linssit. Savuke-kartuscha-2 ja -3 harva-sarjaan harvaPolut-osumilla; kartuscha-2 vartio 3 (lipun napautus) tunnettu punainen: LIPPUTIEDOT kattaa vain FIN/DEU ja savuke mittaa Pariisissa (savukkeen vika); kartuscha-2 luki PW_CHROMIUM-muuttujaa -> korjattu CHROMIUMiksi. Testit 3759/0. Pelikoodari jatkaa astro-kuvakkeen 3 ehdokkaaseen (vain kaappauksina).

## ASTRONAUTIN KAMERAN KUVAKE VALITTU (Fable, Pelikoodari 8039d75d) (20.9.2026 klo 19.18)

Kolme Gemini-ehdokasta (tools/generoi-varustekuvat.mjs EHDOKKAAT-lista, pergamenttikaare kuten muilla varusteilla; kaappaukset docs/raportit/kaappaukset/astro-kuvake-20260920/). Fable valitsi ehdokkaan 3: kyparan lahikuva, Maa visiirissa, kamera edessa - ainoa joka lukee 64 px:ssa; 1 (kokovartalo) ja 2 (leijuu kartan paalla) jaavat pilkuksi. Kayttoonotto: assets/varusteet/varuste-satelliitti.jpg + js/ui.js onSatelliitti-poikkeus pois, samaan haaraan.
