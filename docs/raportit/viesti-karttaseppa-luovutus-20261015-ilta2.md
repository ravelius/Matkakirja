# Karttasepän luovutus 15.10.2026 klo 17.3x (konteksti yli pehmeän rajan; PT ja Postivahti)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261015-ilta.md` (23bc043b1).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261015-ilta2.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. Jatka kohdasta 1.

## 1. AVOIN: pallon neliöt, erä junaan 195 (omistaja 16.33 TF 193, PT) — data ja koodi VALMIS, vienti Julkaisijalla

Raportti ja kuvat: `proto-3d/_tyo/karttaseppa/ruudukko-20261015/LUEMINUT.md` (+ kerma-z5/z6/z7-, pohja-z4/z6-ennen/jälkeen.jpg, vertaa.py).
- Syy: pohjalaattojen JPEG q90:n värilohkot 8 × 8, jotka kerman R − B -kynnys vahvistaa. Otsikkoruudun sumennus (¼-resoluutio) suurentaa ne.
- Data: pohja **2026-09-30-pohja-20261015** (lohkorajat tasoitettu, q95 4:4:4) ja kerma **2026-10-15-p060** (sama resepti).
  T7 `Matkakirja-karttaseppa/ruudukko-20261015/` (purku.py, aja.sh, aja-kerma.sh; tee-pallokerma.mjs ei käynnisty välilyönnillisestä
  polusta → kopio scratchpadista, ks. aja-kerma.sh K=). p060b-kokeilu hylätty (`kerma-p060b-hylatty/`, muutti järviä ja jokia).
- Vientipaketti `proto-3d/_valmiit/pallo-lohkoton-vienti-20261015` (7,8 Gt, 611 676 tiedostoa, kuiva ok) → **Julkaisija ajaa vie-paketti.sh** (pyydetty 17.28).
  **TEE:** kun Julkaisija kuittaa viennin, siirrä paketti T7:lle (`rsync -a` → `/Volumes/T7 4TB/koodaus/proto-3d/_valmiit/`, vertaa
  tiedostomäärä, sitten poista sisäiseltä levyltä; PT 17.2x: levytila). Ei osoitinvaihtoa ennen junaa 195.
- Natiivi: wt `/Users/Shared/Claude/wt/proto-karttaseppa-ruudukko-195`, haara karttaseppa/ruudukko-195 **bfe2b2300** (pushattu natiivi-backup):
  vain osoitteet (SileaUrl, Rakennus.LaattaUrl, Pallo.unity, Kermasarja.Oletus + testi). Junaan 195 vasta, kun vienti on ämpärissä.
- Jos neliöt jäävät: tarkista laitteelta kehittäjäpaneelin "Paperin rae" (Pohjapatina; kovareunaiset solut, oletus 0).
- Kohta 2 (valintanäkymän zoomi ja pyöritys, koneen koko) EI Karttasepän: PT siirsi kameran NUI:lle ja koneen PK:lle.

## 2. Worktreet (poista kun mergetty)

proto-karttaseppa-ruudukko-195 (uusi), karttaseppa-paakaupungit-pysakeiksi-193b (PK:n haara junassa), proto-karttaseppa-kierrokset-194
(NS:n junassa), proto-karttaseppa-iss-skanneri-193 (poista kun NUI:n iss-haara on junassa).

## Muistiinpanot

- Googlen laatoista ei mitata mitään; robots.txt ennen skriptattua hakua.
- Natiivirepo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup), omat haarat karttaseppa/<aihe>, NS kokoaa junat.
