# Natiivi-UI: luovutus 3.11.2026 klo 17.06 (konteksti 30 %; iso kaatui oikealla saapumisella, 2.205 tehty)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1626.md. Sen jono 1–2 on tässä käsitelty; kohta 3 (keisari simulla, keisari
Pekingin kartalle, 1501-avoimet) on yhä voimassa.

## Tehty (proto, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-keisari, haara natiivi-ui/muistihuippu, peili natiivi-backup
## peili/proto/natiivi-ui/muistihuippu)
- **af57175ba** Raamattu 2.205 (omistaja 16.22): kaikki kartan kuvamerkit yhdeksi pieneksi ympyräksi (SaapumisKuvat.Pyorea,
  NostonKoko 18 pt): saapumisen pienet kuvat (ennen 30 pt neliö), nostojen kuvat (myös kyltin mittakaavassa) ja
  Kutsuminiatyyri (2.138, ennen 64 pt neliö + nimi; nyt ympyrä ilman nimeä). Yksi merkki per kohde: saapumisen kuva piiloon,
  jos samassa kohteessa on noston kuva (Kohdenostot.KuvallinenKohde: esittelypaikan kohde nimeltä tai alle 60 m). Kartan kuvan
  napautus suurentaa 220 ms / palaa 200 ms (TraileriLiike.NapautusNousuS/LaskuS = Tyylikirja.Kesto.Avaus/Sulku; trailerin 0,8 s
  ennallaan). tarkista.sh 0 virhettä, kaikki vahdit ok. EI VIELÄ PELISSÄ NÄHTY: PT perui erillisen simun (9.11), menee JU:n
  iso-pakettiin.
- **fd7a9c739** (af57175ba:n päällä): Saapumisesitys.IsoisanLuenta kirjaa syyn, kun luenta ei soi ("luento ohitettu" /
  "esittelyt ohitetaan" / "kertoja pois"). unity-tarkistus 0, kielivahti ok. JU:lle pyydetty iso-pakettiin af57175ba:n sijaan.
- ISO 44ecc31d1 kaksi ajoa (tiedot proto-3d/lokit/nui-muistihuippu-b0753ecc0-20261103/tulos.md):
  1. 16.45 (iso-44ecc31d1-1645/): matkaa ei tapahtunut (ei peninkulmaa, Pariisi–Lontoo ei lentoa) → jatkettu peli Pariisissa:
     ei kaatumista, kartan pikkukuva 3× palauttaa LRU:n 149 → 133 Mt, lähizoom tekstuurit 907 Mt (JU 693cf437f 996). PT kuittasi tämän.
  2. 16.55 (iso-44ecc31d1-1655/), bussilla oikea saapuminen Lontoo → Pariisi: **KAATUI** (signal 9). Kohdenosto: MemoryWarning,
     vapaa 843 Mt. Lähizoom (aja 48.862 2.320 0.03): vapaa 1882 → 911 Mt sekunnissa, tekstuurit 919 ja kuvat 120 Mt ennallaan →
     toinen varoitus → kuoli. ~970 Mt mittaamattomasta luokasta. Epäily: piirroskerros/laatat/renderöintikohteet lähizoomissa
     saapumisen jälkeen. PT:lle KORJAUS kuittaukseen lähetetty 17.04.
  - Isoisän luenta: vauhdikas nykyintro loppui → IsoisanLuenta false ilman riviä (siksi fd7a9c739).
- mittaa.zsh: matka peninkulma → varalla bussi; väärä "KAATUI ennen: app uudelleen" korjattu (tarkistus ennen konsolin killiä).
- NS tekee Pariisin saapumisen loppurajauksen itse (natiiviseppa/pariisi-haivytys-218), tieto af57175ba:n SaapumisKuvat-muutoksista annettu.

## SEURAAJAN JONO
1. Lähizoomin ~970 Mt:n hyppy oikean saapumisen jälkeen: MITTAA ENSIN luokittain (6.16): lisää kuva-lokin muistiriville
   RenderTexture-muisti, Mesh-muisti ja piirroskerroksen laattojen määrä (Profiler.GetRuntimeMemorySizeLong luokittain tai
   PiirrosKerros-laskurit); ehkä NS:n ala (PiirrosKerros.Terava/Saapuu) → sovi NS:n kanssa (local_0f7f169f…) ja PT:lle rivi.
   Toisto: iso-ajo.zsh (lukko kaari, JU:n LAITE NYT ISO), bussireitti toimii.
2. Odota JU:n iso-paketin tulosta (fd7a9c739 + KS pala16/17 + NS e1d619acf + KS b50afd4c2): rivi "isoisän luenta esittelyn
   jälkeen …" kertoo syyn; tarkista kuvamerkit (ympyrät, yksi per kohde, nopea suurennos) paketin kuvista täysikokoisina.
   Luennan syy → korjaa (jos "luento ohitettu": etsi VaiennaPaikanPuhe-kutsu Perillan jälkeen).
3. Huomio: Mono-keko 524 → 1100 Mt maan kuvien esilatauksen jonoutuessa (16.45.53), laskee 744:ään.
4. Edellisen luovutuksen jono 3 (keisari).
