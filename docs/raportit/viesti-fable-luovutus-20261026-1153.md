# Päätoimittajan luovutus 26.10.2026 klo 11.53 (talviaika EET; konteksti 27 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261025-1430 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md).
Session alussa: Monitor odottajat-vahti.py + codex-posti-vahti.sh (Shared/Claude/hooks), git fetch origin claude/postilaatikko.
VIESTIT: mcp__ccd_session_mgmt__send_message session-id:llä. Omistaja on taas koneella (KK:n kortit).

## 0. TÄNÄÄN
- Kone kaatui 25.10. 14.34 (WindowServerin vahtiajastin); roolit herätetty 10.1x. Syy kymmeniin ikkunoihin: VS:n
  MetalTarkistus.cs (OpenCompiledShader) → korjattu HiljainenEditorilla (a63bac658, 211-rungossa c8c0291ff), esto purettu.
  Varotoimet lokissa (PR 5233): ei screencapturea, ei järjestelmäprosessien lopetusta, editorityökalu ei avaa mitään.
- TF 210 TESTAAJILLA 10.23 (4. ajo 40290323441; 2. kaatui koneen kaatumiseen, 3. jäänne-.meta-tiedostoihin).
- Käännöskopiot sisäisellä levyllä (proto-kaannos-linja1-sisa, 21 Gi) → T7-lupaa ei tarvita; runner 2:n node24-vaihtoa EI
  tehdä; NS PR 5234 (Mac-TF oletuspolku sisäiselle) mergetty. Omistajalle EI enää levylupapyyntöjä.
- Omistaja 11.09: Unreal poistetaan (omistaja poistaa itse) → Raamattu 12.12/2.182/2.163 + loki, PR 5235 mergetty
  (huom: mergesin ennen kuin testit valmistuivat; main 3e6eabc5b vihreä jälkikäteen → odota checks aina loppuun).
- Asemataulu: tyolistavahti.py korjattu (sekunnit → ms, dokumentin ts = uusin rivi); junat: Juna 211 auki, TF 210 testaajilla;
  eteneminen.json = Juna 211. Asemataulu vie joka kierroksella muuttuneet.
- Levy 94 Gi (JU siivosi + Unreal pois).

## 1. JUNA 211 (runko NS: e77543fc7 = räystäskamera 957cc6a4b + Metal-korjaus)
- PK räystäskamera: v54/v46 editorissa porttihallien piilot 0 → LT:n laiteajo A+B KÄYNNISSÄ (tulos LT → PT). Kuittaus vasta
  sen jälkeen. Sitten PK: kolmikot aukio + kujaportti + porttihalli PT:lle → KK → omistaja; sitten lautaspöydän pari.
- LR: tausta-v54 + rakennukset-v46 ämpärissä (terassit lähteen korkeudelle: Longzongmen 0,3 m, Zhendumen/Youyimen 2,5 m).
  tausta-v55 (galleriat 1,8 m, Zhaodemen 2,5 m) valmis, KUITTAA vasta yhdessä rakennukset-v47:n (porttipinnat: marmori,
  leivonta oikealla taivaalla, kiila pois) kuvaparin jälkeen. Kujakolmikot 02/05 PALAUTETTU 11.5x: reunaporras tasaharmaa →
  laattapinta kuten havainteessa. Sitten kolmikot → KK:lle KYSYMYS kujien leveydestä (kumoaa 11.32:n 7,7/10,7).
- VS (nollattu fed2a93cf): valo 1–3 + salin pilotti 3; pari 04 + 01 PT:lle.
- KS: elävä kartta (proto karttaseppa/elava-kartta, kytkin matkakirja-elava-kartta, NUI-maininta 6f5f3a0bc). KK PALAUTTI parin
  11.27 (viivat, läiskä, ratapiha). Ratapiha korjattu; karkeat ranta/rajakerrokset häipyvät Z10,5:stä (295600481 käännöksessä);
  St Mary Hoon läiskä = rinnevalo → KS tasaa Z12+:lla, todistus Thames + Alpit. PT:n päätös: patina pysyy (koko kartan ilme).
  Uusi pari ESIMERKKI | PELI PT:lle → tarkista 1:1 KK:n tarkkuudella (Raamattu 7.32: vain pelikuvia) → KK. KS kovalla rajalla.
- NUI: jono tyhjä (levossa).

## 2. ODOTTAA OMISTAJAA
- Kujien 02/05 leveys (kun LR:n kolmikot kunnossa). Elävän kartan pari (kun KS:n korjattu). Aukio/kujaportti/porttihalli-kolmikot.

## 3. Opit (kirjaa lokiin)
- Kuvan tarkistus ennen KK:ta: koko kuva 1:1, myös toissijaiset alueet (KK löysi 3 vikaa, PT näki 1).
- Offline-renderöintejä ei näytetä omistajalle (7.32), vain pelikuvia.
- PR:n merge vasta, kun kaikki checks ovat valmiit (gh pr checks --watch voi palata ennen kuin checkit ovat alkaneet).
