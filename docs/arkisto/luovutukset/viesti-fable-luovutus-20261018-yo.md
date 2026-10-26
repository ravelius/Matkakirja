# Päätoimittajan luovutus 18.10.2026 klo 00.0x (konteksti 30 %; tili vvi@vvi.fi; viikko 92 %)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589 (KK 38 %: suositeltu luovutus + nollauskortti
TF 201:n jälkeen). Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (junat v119,
tyolista v57). Edellinen luovutus: viesti-fable-luovutus-20261017-ilta4.md.
VIIKKO 92 %: vain omistajan pyynnöt ja niiden jatkot; tyhjäkäyville (SK, VS, Siirtoseppä, ÄÄ) ei uusia eriä.
Kaikki roolit nollattu tänä iltana (KS, PK, JU, LS, NS, NUI, KK 22.50). Asemataulun paikalliset tiedostot
scratchpad/asemataulu/data/talo/{junat,tyolista}.json pidetty SAMASSA tilassa kuin tietokanta (muuten Postivahdin vienti kumoaa).

## 0. Heti
RC päälle, odottajavahti-Monitor (30 min, uudelleen joka vanhenemisella), get_usage self.
PR #4832 (Raamattu + loki: Claude-API uuden organisaation avaimella) – taustaskripti mergeää vihreänä; tarkista `gh pr view 4832`.

## 1. JUNA 201 (OMISTAJA PYYSI JULKAISUA 23.21: "nämä korjaukset voi julkaista heti ilman testejä")
Ei laitetestejä eikä muistiajoa; KK hyväksyy kuvat omistajan puolesta. NS lukitsee klo 00.30, runko 57777f2b6 (+ PK juoksupeli
99a83b3d9 vain jos yhdistyy puhtaasti ja testit vihreät ennen 00.30). Muutosloki #4831 mergetty (90a41f5d5).
Mukana: Louvren alut suomeksi (LS 133e7c00e), Tivolin iltakuva, kokoruutu-lepo/akku (NS 86064a98f, KK hyväksyi), kohdekaupungit
kehittäjätilassa (KS 440325942: pallokuvan kamera sammui ennen piirtoa levossa), maakunnan Lue lisää (NUI fef47c0aa, KK hyväksyi),
Mona Lisa f7952e7b3 (napautus kaiteen eteen, kävely suoraan 1,3 m/s, kääntö ≤ 15°) TESTIEN PERUSTEELLA: LS:n kuvat m0–m2 ennen
TF-latausta → PT katsoo täysikokoisena → KK; vika → TF seis ja commit pois.
EI MUKANA: pyramidi (omistaja 23.46 "näyttää leijuvan" → LS korjaa kontaktivarjoksi, juna 202), kehysnappien häivytys, ISS-hammasratas.
TF-rivi: NS/JU → PT → KK (tf201-ketju.log). NS:ltä kuvapari kartalta lukituskäännöksestä (kipsipallot hunnulla | ilman).

## 2. JUNA 202 / TYÖN ALLA (kaikki omistajan pyyntöjä)
- LS: pyramidin kontaktivarjo (ei rakoa; TeravaSiirtoY 0,028 syy) → lähikuva + 4× PT (TARKISTA KONTAKTI, muisti pt-kuvan-tarkistus);
  Mona Lisa jatko: kehys (Commons-malli, terävä), kierroksen suora linja, musta välähdys isoon suunnanmuutokseen, himmeän ‹ ⏸ › napautus.
- NUI (luovutus e325797f7): kehysnappien häivytys kaikissa linsseissä (23.02 + 23.10 + 23.16: himmeässä tilassa napautus vain tuo napit,
  vedot aina suoraan) → < 1 min video kipistä ja ISS:stä → KK → omistaja; sitten ISS-hammasratas + kohdevalikko ilman ikkunaa -LUONNOS
  (23.00) → kuvapari iPhone + iPad. Raamatun peitto ≤ 45 % / YKSI LAPPU muutetaan vasta omistajan hyväksynnän jälkeen.
- NS: LampoMittari akku ennen | jälkeen iPadilla yöllä → rivi KK:lle.
- ÄÄ: kielipakko-PR #4830 (language_code fi kaikkiin kutsuihin + testi) → merge vihreänä, rivi KK:lle. 47 riskiottoa EI uusita (omistaja 23.03).
- API-avain: kun omistaja on poistanut vanhan KLIK-avaimen (KK välittää), JU ajaa savuke-pollo.yml → rivi KK:lle.
- PK: editoriesikatselun korjauskierros (L1 vasta TF 201:n jälkeen); juoksupelin harmaa → omistajan pelattavaksi (KK tietää).
- KS: Kiina v5 (0bf177c8b) simu JU:lla 201-ajojen jälkeen → pätkä PT → KK.
- LR: galleria 4c f23550247 (yksi valon suunta, myös pyramidin varjon suunta) JU:lla → LR → PT → KK.
- Levy 48 Gi, laskee ~4 Gi/kierros: Postivahti poster-tyhjennys TF 201:n jälkeen, JU siivoaa omat kansionsa; < 25 Gi → PT.

## 3. KIRJATTU TÄNÄÄN (Raamattu + loki, #4826 ja #4829 mergetty)
Suomi aina pakotettuna (23.04), kamera-ajot EI PYÖRITYSTÄ + siirrot oikovat esteiden läpi (23.14), siirron kesto kävelynopeudella (23.17).
OPPI: PT hyväksyi pyramidin varjon katsomatta kontaktia → muisti pt-kuvan-tarkistus-taysikokoisena (lisäys 23.46).
