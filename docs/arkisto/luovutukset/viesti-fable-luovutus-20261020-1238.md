# Päätoimittajan luovutus 20.10.2026 klo 12.38 (konteksti 30 %, pehmeä raja)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261020-1035.md (käsitelty). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.
VIESTIRAJA: SendMessage pysähtyi 10 viestin jälkeen → kaikki roolit mcp__ccd_session_mgmt__send_message session-id:llä (toimii).

## 0. HETI ALUSSA
1. Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen).
2. Odota ja tarkista TÄYSIKOKOISINA ennen NS:n OK-riviä:
   - VS k5 99838b4b1 (louvre-varjo-208 ⊃ 28bc7aacc): Horatiusten valan punainen ellipsi kehyksen yläpuolella pois (leivottu salin
     valoatlakseen; k5 puristaa sen pystyseinällä tasaiseksi pesuksi). JU kääntää 208e-appiin → 1 simu (Horatius + Kythera + madonna).
     Tarkista myös, ettei madonnan omistajan hyväksymä kaarivarjo heikkene. OK → "PT OK 208: VS 99838b4b1" NS:lle (korvaa 28bc7aacc).
   - PK: omistajan 12.33 "mikään ei saa ilmestyä yhtäkkiä ruudulle" (vartijat, kerättävät, LOD-poksahdukset). PK selvittää + korjaa
     + simuvideo iPad + iPhone (näkyvyys ja suorituskyky ovat tekniikkaa) → PT → OK:lla NS:lle.
3. Kun PK:n korjaus ja VS:n liike-208 cadf8241d ovat rungossa: NS antaa LT:lle (local_36a45147-8407-4cfb-bbdb-c20d5f684735) sha:n →
   LT mittaa GPU:n iPad Pro 13:lla (liike-epäterävyys Low → Medium lisää kuormaa; 207-taso GPU 9,7 ms).

## 1. Omistajan päätökset tänään 10.36–12.34 (lokissa #5032, #5033, #5034; 12.00–12.34 tämän PR:n lokissa)
- 11.04 "Pehmeä kohdevalo" (ei kattoikkunavaloa). 11.56 "muut ok, kallioluolan madonnasta puutuu taulun varjo kokonaan".
  12.33 madonnan kuvista "varjo hyvä. muuta ipadilla teksti tummaksi kuten iphonella on" (NUI 224fe6c50 tehty, NS OK).
- 11.45 SIMU HARVOIN (Raamattu 9.11, #5033): simu vain uuteen tekniikkaan, omistajan pyytämiin kuviin ja yöjunan laitekierrokseen;
  muu automaattitarkistuksin (+ Mac-esikatselu) suoraan avoimeen junaan. 11.47 "Vain Louvren valo": 9 linssin napit ja palatsi
  pelistä, PT kuittaa palatsikierrokset (ei KK:lle).
- 12.33 "vartijoita ja kerättäviä asioita yms. ilmestyy tyhjästä…" → PK. 12.34 "terävän ja epäterävän raja on liian selkeä…" →
  VS: syy oli liike-epäterävyys (syväterävyys pois rungossa) → cadf8241d (Low → Medium), NS OK. KK:lta kysytty, mikä build iPadilla.
- 12.00–12.34 kirjattu lokiin tämän luovutuksen PR:ssä.

## 2. Juna 208 (AUKI, julkaisu VAIN omistajan pyynnöstä 09.47)
NS:n runko df83610ab vihreä → runkotestit daea295d3 käynnissä. PT OK annettu NS:lle:
NUI 44096a792 → 3552de132 → 472d8f4ca → 224fe6c50 (museo, 9 linssin napit, lisenssirivin fontti, iPadin nimen sävy);
PK palatsi 9c59233cf → 83ba2501e (katto sisällä, Lavastajan rakennukset v12 -lattia, VS:n vesi k6 9a82a1fa0) + juoksunimet e6238c958
+ VS pinnat 1dfc80671; lämmitys f6e92d277 HYVÄKSYTTY (LT: 350/58 ms:n ruudut poissa, ka 16,7 ms, GPU 9,7); VS Louvre 28bc7aacc;
VS liike-208 cadf8241d. Rakennukset v12 ämpäriin JU:lla (NS varmistaa ennen käännöstä).
Kun kaikki kuitattu → PT → KK "208 valmis julkaistavaksi" (KK kysyy omistajalta).

## 3. Muut
- Simut: 2. simupaikka käytössä (linna tauolla). JU:n jonosäännöt: omistajan odottamat ensin, raskaat 1 kerrallaan, muisti ≥ 20 %,
  ei vanhentuneita käännöksiä. Yksi käännös kerrallaan simujen rinnalla, kunnes levy > 70 Gi (nyt ~76).
- TKS: Unity-esikatselu Macilla (777c7f63a + App Nap -korjaus 33b461e8c) → käyttöön ~13.30; ilmoita KK:lle, kun 1. rooli käyttää.
- Codex: PT733–737 ei vielä toimitettu (Puyi207-hihan jälkeen). Lavastaja → rakennukset-v13 ja LS → Louvren kulmakoristeet, kun tulevat.
- Lepäävät (vko 85 %): Karttaseppä, Äänittäjä, Sisältökirjuri, Projektiseppä, Työkaluseppä (paitsi esikatselu), NUI (32 %), LS, Lavastaja.
- Asemataulu nollattu 11.4x: B-cron poistettu pysyvästi (7.39, #5031) – Postivahdille ja hoitajalle kerrottu.


## 4. LISÄYS 12.40: omistaja pelaa itse kytketyllä iPadilla
- OMISTAJA 12.38: "pystynkö itse pelaamaan peliä, jos se vain avataan minulle simulaattorissa? ei tarvitsisi odotella julkaisua" +
  "olen nyt töissä, niin pystyn käyttämään kytkettyä ipadia." → omistaja pelaa LT:n iPad Pro 13:lla (208-runko df83610ab).
  NS asentaa jokaisen vihreän 208-rungon iPadiin ja kertoo KK:lle; LT ei asenna, sulje eikä mittaa omistajan pelatessa (GPU-mittaus
  vasta KK:n vahvistuksella); JU ei varaa iPadia. Etäkäyttö simulla myöhemmin omistajan pyynnöstä. Kaikille kerrottu 12.40.
- Syväterävyys: KK:n mukaan päällä df83610ab:ssä, VS:n mukaan pois → VS tarkistaa laiteäpistä; jos päällä, myös sen liuku pidemmäksi.

- HUOM PT:n virhe 12.4x: työtilan luonti epäonnistui ja commit meni päächeckoutin haaraan claude/bold-ride-vow4ki (486ec4976,
  sisälsi .claude/settings*.json + launch.json) → pushattu, PR #5036 SULJETTU mergeämättä, paikallinen commit peruttu (soft reset).
  Etähaara jäi osoittamaan 486ec4976:aan (ennen a990bbd1f); palautus vaatii force-pushin → vain omistajan luvalla.
