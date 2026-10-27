# Päätoimittajan luovutus 27.10.2026 klo 19.51 (tili sami.reivinen@vvi.fi, PT local_8d8ebf72, konteksti 30 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen -20261027-1641.
Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Kirjoitukset: muokkaa paikallista
scratchpad/asemataulu/data/talo/*.json (.tmp + os.replace) ja pyydä Asemataulua (local_9faa33de) viemään
(nyt junat v162+, tyolista v191+, eteneminen v80 = "Juna 213"). Tarkistimen säännöt: aika ≤ 20 merkkiä; junan
teksti alkaa "Valmiina:" tai "Työn alla:"; lukitussa junassa vain "Valmiina:"; eteneminen.json:n nimen on vastattava
jotakin junariviä; muista päivittää rivin ja tiedoston ts.
Lokikirjaukset: tools/uusi-worktree.sh fable <aihe> → node tools/raamattu-kirjaa.mjs → PR → squash → --poista.
VIESTIT: SendMessage-raja täyttyi 17.2x → käytä mcp__ccd_session_mgmt__send_message (CLAUDE.md, Raamattu 12.20).
KIELI: omistajalle näkyvä teksti, myös PT:n oma ikkuna, VAIN SUOMEKSI (omistaja 19.23, loki PR 5380).

## 1. JUNAT
- TF 212 (runko 80b1ea539, muutosloki #5378) sisäisellä ryhmällä 19.12; ulkoinen (vain-arvio) JU:n ketjussa.
  Omistaja 18.52: "Julkaise juna jotta näen uudet kartta jutut. Ei testejä".
- Juna 213 auki: runko natiiviseppa/juna-213 3b0b4402f (= 80b1ea539 + PK:n jetsam-korjaus), testit vihreät.
  Seuraavaksi PK:n eunukkierä (c2-fg-212 d26b87c8f + Codexin takapinta/land_heavy, hahmot-v9) KK:n videon jälkeen.
- Huohotus-mp3:t (7 kpl) jäävät ämpäriin viittaamattomina (TF 211 voi viitata); poisto vasta omistajan luvalla,
  kun 212 ainoa TF.

## 2. OMISTAJAN PÄÄTÖKSET TÄNÄÄN 16.41 JÄLKEEN (kaikki lokissa)
- 17.25 repliikit: otto 4 (Sergio "Sainpas sinut!"), otto 9 (keisari "Päästä irti!…"); Äänittäjä vei (cebad78ca).
- 17.48 keisari kasvot kameraan → KUMOTTU 18.12: eunukin selkä peittää keisarin (PR 5374).
- 18.37 + 18.51 hengitysääni pois kokonaan → Raamattu 5.29 (PR 5377); ei koske ISS:n kypärähengitystä.
  Avoin: Äänittäjä poistaa "hengästynyt" keisarin äänityylistä (tekstit.fi.json juoksupeli.aanityyli.kuvaus) ja
  tarkistaa otot; keisari-2-huh ([gasps]) ei ole rungossa, PK poistaa väistörepliikeistä 213:een.
- 18.52 juna 212 julkaisuun ilman testejä.
- Opit lokissa: kortin kaksi eri kuvaa (PR 5370, PT ohitti koosteessa kohdat 1 ja 4), Lue lisää -toistotarkistus
  väljennetty (KK 17.24, PR 5369), suomi (PR 5380).
- PT:n omat: LR:n uusi leivonta (rakennukset-v54) EI nyt, 10.56-päätös voimassa; vain katon UV1 tehty (katto_uv1.py).

## 3. JUOKSUPELI
- Jetsam (2. avaus kaatui): syy siivouksen puute sulkiessa; korjaus 7ac355ba4 todettu iPadilla (LT, 4924a87b6),
  junassa 213. TF 212:ssa vika on yhä (testaajat: käynnistä appi uudelleen).
- Reunakivi: muoto v87m hyväksytty KK:lla (16.03-sanoja vasten). LR korjaa saumojen valkoiset lovet → tausta-v60 →
  uusi pari KK:lle ja PT:lle; omistajalle vasta lovettomana. VS:n pinta seinat-211 b60aa63f2 (rosoisuus), ei vielä
  junassa; jäännös tarkistetaan LR:n v82-parilla.
- LT ajaa väreilyn + taivaan porrastuksen 4924a87b6-apilla; lopuksi 212-runko iPadiin.
- C1 v4 PK:n kuittaama (epävarma: Meridiaaniportin itäpaviljongin nurkka). T-risteyksen katot rikki (LR:n EROLISTA).
- Kattoläikät = valokartan smart_project-saarekkeet; uusi leivonta jonossa muotoerien jälkeen.

## 4. MUUT
- Unesco 18/18 (KS): omat Commons-kuvat ≠ havainnekuvan lähde, Akropolis 400-luku eaa., Kreikka-piilotus; TF 212:ssa.
  Akropolis-kooste 2 KK:lla (kuvateksti peitti osan Pulun kysymyksestä – koosteen vika).
- KS: Tanskan ja tasankojen matalat mäet aloitettu junaan 213 (PT 19.5x).
- NUI levossa (jono tyhjä); seuraava UI-erä 213:sta tai omistajan TF 212 -palautteesta.
- Olavinlinna 3c valmis (NS), 3d hyväksytty → LR kokoaa; auki hahmojen ARKit-ilmeet ja aarteet J3/J4.
- Nollaukset tänään: VS 3., LR 7., PK 8., KK 5. Levy ~37–40 Gi (siivottu: PT fable-posti-0945, NUI 4 wt:tä).
