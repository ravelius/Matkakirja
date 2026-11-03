# Natiivi-UI: luovutus 30.10.2026 klo 02.06 (jono tyhjä, konteksti 30 %)

## Valmis: Taihedianin halli (juna 215) – kaikki erät läpi
- Portaiden johteet ja G-terassin kaiteet: KK hyväksyi parin 8 (02.1x). NS:lle on lähetetty proto 0a1a2c837 (natiivi-ui/halli-215,
  peili natiivi-backup peili/proto/natiivi-ui/halli-215-v73). Kyseessä on yksi commit juna-215:n päälle: OsasarjaKaiteetKansio
  "kielletty-halli-kaiteet-v4/" (LR v90, SHA256SUMS 92c12c73; johde ja pylväs V4_marmori). b49275c00 (kallistus) ja aiemmat ovat jo
  junassa. tarkista.sh 0 virhettä. JU vie kaiteet-v4:n ämpäriin.
- Seuranta: NS:n kuittaus 0a1a2c837:stä. Jos NS kysyy, paketti on _valmiit/juoksupeli-kk-lavastaja-v90-vienti-20261030.

## Vianhaun tulos (tiedoksi, ei avoimia)
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/halli-215/ (H). Kaikki yksityiskohdat: H/pari6-tulos.md.
- LOD1-paketissa ei ollut paikkavikaa. Luovutuksen 23.14 "450 m väärässä paikassa" oli kehysvertailun virhe: kamera katsoo
  maailmassa −z:hen. isVisible ei kerro mitään (jalustakin näyttää False).
- kaide-johde-1.5m on nollapaksu taso. Kohdista 03/03b portaiden johteet näkyvät syrjittäin, joten portaat kuvataan viistosta:
  06 omalla paikalla −2 −135 −2.03, lodkerroin 0.2 (H/ajo-pari-6b.zsh, -7.zsh, -8.zsh).
- LOD1:ssä pylväät (myös C2:n LOD1-korvaus) tulevat kaiteet-paketin osat.glb:stä, eivät C2:n 1061:stä. C2:n pylväsmuutokset
  (c2-v18) eivät näy aukion kuvissa.
- Testijuuret REF 362182ba5:lle: H/juuri-215-ennen, -v87, -v88, -v90 (symlinkit; vain omaan työkansioon).
- Debug-haara natiivi-ui/halli-215-debug on poistettu paikallisesti; peili peili/proto/natiivi-ui/halli-215-debug on jätetty.
- Huom PK:lle (PT välittää): rungon 362182ba5 pintalista ei tunne pintoja V4_paaharja, V4_nimitaulu, V4_jalusta_lohkokivi,
  baoding-pbr ja marble-railing-post-pbr (33 VIKAa editori.sh:n pintatarkistuksessa).

## Jono
Tyhjä. Uusi sessio: "JONO TYHJÄ: NUI" PT:lle, jos PT ei ole antanut uutta erää.
