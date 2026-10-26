# Päätoimittajan luovutus 15.10.2026 klo 17.4x (oma nollaus, konteksti 28 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589 (nollattu 17.16). Id:t /Users/Shared/Claude/osoitekirja.md (LR nyt Opus medium). Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikalliset muutokset scratchpad/asemataulu/data/talo/{junat,tyolista}.json (Postivahti vie).

## 0. Heti aluksi
Aloitusviestin mukaan: RC päälle, odottajavahti-Monitor, get_usage self.

## 1. Omistajan päätökset (kaikki lokissa + Raamatussa, PR #4631 = 69c3acc4f)
- 17.0x ISOISÄN UNI: alkusoitto ennen aloituslentoa, 3 unikuvaa (El Dorado, Montezuman turkoosinaamio, keisarin jadesinetti) + Kolme veljestä, reunat häivytettyinä; Aarnin luettelo paljastuu kun Kolme veljestä löytyy. 17.12: aloituskaupungissa EI isoisän puhetta, Pulu aloittaa suoraan Pöllöstä; isoisän eka matkakirjateksti vasta seuraavassa kaupungissa.
  Tila: SK:n teksti + Pulun rivit Tekstit-osastossa omistajan hyväksyttävänä (docs/raportit/isoisan-uni-teksti-20261015.md; sinetti "vuosisatoja sitten"; "Kuuntele sillä välin…" poistettu). Codex-tilaus unikuvista d705fd7ec (posti). Toteutus Natiivi-UI:lle (nollattu, levossa) kun teksti hyväksytty ja kuvat kuitattu; ääni vasta hyväksynnän jälkeen.
- 17.17 Louvre v2d pohjaksi → TAVOITELUUPPI; 17.22 uudet 3D-mallit jatkossa Codexille, Louvre Claudella vertailuksi (VERTAILU.md); 17.23 LUUPIN TYÖNJAKO (Raamattu TAVOITELUUPPI). LR (nollattu, Opus medium) lähetti Codex-tilauksen 8c0fbcdea (7 kulmaa, maskit IoU ≥ 95 %), tekee kierrosskriptin. PT:lle vain tavoitekuvat hyväksyttäväksi ja lopputulos.
- 17.18 Pekingin piilotettu testikaupunki omistajalle: Valoseppä (suunnitelma hyväksytty: Kehittäjä › Kokeet -rivi, kehityslippu, ei Googlea, R2 omat-mallit/piilo/peking), koodi alkoi TF 194:n jälkeen; Codexilta mallipaketti pyydetty 664b6ee80 → välitä polku Valosepälle kun tulee. Junaan 196.
- 17.24 "tehdään juna 195 vasta sitten kun pyydän": ei lukitusta/käännöstä/TF:ää ennen pyyntöä (NS + JU tietävät). Ämpäriviennit uusiin polkuihin sallittu (PT:n tulkinta), osoitinvaihto vasta junassa.
- KK:n 17.0x Asemataulun Kulutus 5 h -järjestys: valmis (JU, versio 4).

## 2. Junat
- TF 194 VALMIS 5/5 (sisäisillä 17.25, ulkoinen 17.26, 193 vanhennettu). Taulu päivitetty.
- Juna 195 kertyy, runko bd8172744 (NS): 4b7126972 + Siirtoseppä vapaa lento 2468450eb + LS1 f0a07ccb1 (historia pysähdyksen lopussa, DTM-korostus) + NUI 8eaf6307c (intron pehmeys) + LS1 66c5be330 (Ateenan kulmat). Kuitattu, odottaa runkoon: KS ruudukko-195 bfe2b2300 (pallon neliöt) kun JU on vienyt pallo-lohkoton-vienti-20261015 (7,8 Gt; JU vie, sitten KS-seuraaja siirtää T7:lle).
  Työn alla: PK-seuraaja (106927127) lentokone pieneksi + raketin hohtava piste pois + "Mikä tämä on?"; LS1 kohdat 3 (sivulista vaihtuu vasta perillä) ja 2 (Ateenan lennon kamera kattojen yllä); SK historiaosioiden kuvat Praha + Ateena (sitten Lontoo, Kööpenhamina; 404 nyt, data ilman käännöstä). e02-puut: PK vahvistaa LS1:ltä.
  "3 virhettä" -ehto raukesi (lista ei säilynyt); LS1:n historia195-arkki OK.

## 3. Muut
- Codex Peking47 vastattu e9e9c445e (aukion 4 suojattua rakennusta yksinkertaisina massoina, ei lyhtyjä ilman lähdettä).
- Levy 60 Gi vakaa (Unity b5 15G + väliaikaiset). NS ajaa b5-testiä omassa haarassa; b4 pysyy (195-runko b4:llä); alle 50 Gi → NS siirtää b4:n T7:lle (hyväksytty).
- Nollattu tänään illalla: NUI, KK, LR, NS, KS, PK, LS1. Levossa: Äänittäjä, NUI.
- Codex-postilaatikko: odottaa Codexin vastauksia (unikuvat, Peking-paketti, Louvre-tavoitteet).
