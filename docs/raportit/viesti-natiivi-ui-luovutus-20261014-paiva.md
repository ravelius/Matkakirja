# Natiivi-UI: luovutus 14.10.2026 klo 11.4x (nollaus, PT:n pyyntö, konteksti 56 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-aamu.md. Pysyvät säännöt
-20261012-ilta.md ja -20261010-aamu.md. Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012
(pari-arkki.py = NYKYINEN | UUSI, uusi-arkki.py = vain UUSI, *-kuvat.sh = asettelutestit L2:lla, kdiag*-ajo.sh = simu).
Arkit: proto-3d/lokit/natiivi-ui-arkit-189.

## UUDET SÄÄNNÖT (omistaja 14.10.)
- PT on nyt PÄÄTOIMITTAJA (Opus, medium) local_74630a27-8c1b-4ac3-9143-538efab8cbcd. Vanha local_593b89a1 = omistajan
  KESKUSTELUKANAVA: sinne EI viestejä. Viestit aina `mcp__ccd_session_mgmt__send_message` session id:llä osoitekirjasta
  /Users/Shared/Claude/osoitekirja.md (ei nimellä). PT:lle ≤ 3 riviä (mitä, sha, kuvien polku).
- Nollaus: luovutus + push → Postivahdille local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7 "LUOVUTUS VALMIS <sha>" (ei omaa clear_sessionia).
- ÄÄNI: mikään ajo ei soita Macin kaiuttimista. Simu/Mac-ajo alkaa `aani mykistys`; asettelutestissä mykistys AsetteluTesti.Aja +
  Askel (EditorUtility.audioMasterMute + AudioListener.volume 0, NS vei masteriin 578d481d0). Selainesikatselun jälkeen tabs_close.
  Ääntä kuuluu → tapa OMA pid heti (lukko vapautuu trapilla) ja "ÄÄNI NUI: …" PT:lle.
- Linssiseppä 2 = VALOSEPPÄ (sama id). Levy kriittinen: poista mergetyt worktreet heti (tehty 14.10., ~14 Gt).

## Juna 189: valmis ja TF:ssä (ei toimia)
NUI:lta junassa: ISS V3c Kuvat + testit 68a73d437, raketin latauskuva natiivi-ui/raketti-kuva-189 75e40fefd (varjo + leveän
vaakaruudun rajaus −0,3), museon pyyhkäisykorjaus natiivi-ui/museo-pyyhkaisy-189 b71394d0a (Kosketusvieritys: ScrollView kaappasi
irrotuksen → vanha id → seuraavan napautuksen PointerMove aloitti vedon; nollaus pb == 0 / sama osoitin uudelleen; simu + lehden
vetotesti ok). Diagnostiikka `ui kosketusdiag 1` vain haarassa natiivi-ui/museo-kosketusdiag-189 (EI junaan, worktree poistettu).

## JONO (PT:n järjestys)
### 1. ISS AUTO (astronauttien kuvat) – natiivi-ui/iss-auto-189, worktree wt/proto-natiivi-ui-issauto, HEAD 8d66868f5 (master yhdistetty)
- Omistaja (PT:n kautta 09.5x): AUTO = luenta heti (SeliteNakyi: AutoKaytossa → lukija.Paina), AUTO päällä oranssi
  (astronautin-auto.uss .mk-valittu → --tk-tila-live), luennan alkaessa häivytys kaikki paitsi otsikko, kuva ja pallo
  (NaytaAutoNapit: ✕, Pulu, kohdeNapit, nauha, lukija.Juuri, vakanen; LuentaPiilotusS 1 s), napautus palauttaa, 4 s → taas pois.
- PT:n korjaus tehty 0df13dce3: otsikko kokonaisena myös AUTOssa ("Etna — Sisilia, Italia").
- KESKEN: asettelutesti issauto-kuvat.sh 4 (L2, käynnistyi 11.45; näkymät auto/luenta/napautus; AUTO pois -kuva v2:sta).
  Jos ylittää 6 min, kuvat ovat /Users/Shared/Claude/proto-3d/Matkakirja-proto-linja2/tulokset/asettelukuvat/*astronautin-kuva-*.png.
  → arkki (iPhone vaaka + iPad vaaka: AUTO pois | AUTO päällä | luennan aikana | napautuksen jälkeen; kaava ks. edellinen arkki
  natiivi-ui-arkit-189/iss-auto-*.jpg) PT:lle → PT kuittasi jo ehdollisesti: otsikkokorjauksen jälkeen KUITATTU junaan 190 → SHA NS:lle.
- Huom: iPhone-vaakakuvan haalea ☰ ✕:n alla = asettelutestin jäänne (linssi ei auki; iPadilla ei näy) – varmista simulla, jos PT kysyy.
  Web-pariteetti: webissä AUTO yhä vanha väri (mainittu PT:lle).
### 2. ISS-kohdevalikon UI – natiivi-ui/iss-kohdevalikko-190, worktree wt/proto-natiivi-ui-kohdevalikko, HEAD 92aef1dd0
- UI/Linssit/IssKohdevalikko.cs (uusi, .meta mukana): pohja = oppaan ☾ "Aika ja sää" (mk-linssivalikko--pohja tk-teema-harmaa),
  LIVE-laatikko (KupoliLive), Vuorokaudenaika/Vuodenaika ✓-sarakkeet (KupolinValinta, valitun uusi painallus = nyt), Kohteet
  (Oma sijainti lihavoituna + PK:n KohdevalikonKohteet, LennaValinnalla / LennaOmaanValinnalla), peite sulkee, vaaka: valitsimet
  vasemmalla. Testikomento `ui linssi kohdevalikko auki|kiinni|kausi n|vrk n|live|kohde <tunnus>|oma|tila`. Asettelunäkymät
  "iss kohdevalikko" ja "oppaan aika" (vertailu).
- PK:n rajapinta pelikoodari/iss-kupoli-190 (PK yhdisti ba9ad7608 + af3586c97 → 7c473e831). PK:n video+arkki
  proto-3d/lokit/pk-kupoli-v2-20261014/kohdevalikko1/.
- PT:n löydös (tasainen harmaa, lista katkeaa): vertailu lähetetty (natiivi-ui-arkit-189/iss-kohdevalikko-vs-oppaan-aika.jpg =
  sama pohja). Korjaus 92aef1dd0: alareuna ohjaamopaneelin yläpuolelle (IssKyytiNakyma.OhjaamoLaatikko kuten Pulun taulu).
  KESKEN: asettelutesti kohdevalikko-kuvat.sh 4 (jonossa issaudon perässä) → tarkista iPad pysty (ei ohjaamon päällä) → arkki PT:lle
  → SHA PK:lle yhdistettäväksi (PK kuvaa uuden videon). AVOIN KYSYMYS PT:llä: tarvitaanko näkyvä vieritysmerkki (ei missään pohjassa).
- PT 11.5x: POHJA HYVÄKSYTTY (sama kuin oppaan Aika ja sää); vierityspalkkia EI tarvita (puolikas rivi riittää). 92aef1dd0 kuitataan
  asettelutestin kuvista: iPad VAAKA, paneeli ei saa peittää ohjaamoa → arkki PT:lle. Valikko junaan yhdessä PK:n kohdekorjauksen kanssa.
- Asettelutestin KESKITYS-varoitus "Ilta  ✓" +0,8 pt = ✓-merkin pohjan oma (sama oppaan ☾-listassa), ei korjattavaa.
### 3. Cupolan latausruudun luettavuus
- Cupolan musta avaus (AstronautinNakyma cupolaMusta: ISS · lentokorkeus · nopeus · aika) oli ajattelijapohjan 26/14 pt → LCD-asteikko
  Koko.Lcd 30 / LcdMini 20: af3586c97 (kohdevalikkohaarassa, PK yhdisti iss-kupoli-190:een 7c473e831). Näkyy PK:n seuraavassa
  ajossa → katso kuva (koko ruudun musta, teksti luettava?) → jos yhä heikko, ehdota PT:lle (esim. LATAUSKUVA-pohja kuten raketin
  latausruutu); mustan kestoon ei kosketa (PK: lyhennys vain laattojen ollessa valmiina).

## Muut
- Raketin mittaritaulu natiivi-ui/raketti-lcd-189 0cad3a15a: pidä haara, NS ottaa raketin pakettina (worktree poistettu, haara jää).
- SK kysyi saapumisintron lisäkuvista: vastattu (PT:n erä, Commons-oletus).
- Levysiivous: 19 proto- ja 4 web-worktreetä poistettu, app-kopiot/lokit NAS:lle. Jäljellä wt/proto-natiivi-ui-{issauto,kohdevalikko,
  keskitys188 (asettelutestin skripti ui-asettelutesti.sh – älä poista)}.
- Asettelutesti: haaran pitää yhdistyä masteriin ilman ristiriitoja (muuten "Merge conflict" ja exit 1 heti) → `git merge master`
  worktreessä ennen ajoa. Näkymä on lisättävä LinnanNakymat-listaan, jos ajetaan osalla linna.
