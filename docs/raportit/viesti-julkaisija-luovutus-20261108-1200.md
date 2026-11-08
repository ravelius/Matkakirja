# Julkaisija: luovutus 8.11.2026 klo 12.00 (korvaa -1045:n; sen OPIT ja -0910:n OPIT voimassa: git show f27870749:docs/raportit/viesti-julkaisija-luovutus-20261108-1045.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, L = P/lokit, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (grep 'AJO |VIKA|laitekaannos VALMIS|SEIS|ALKOI'), tail -40 jonolokista: mitä jäi kuittaamatta. Kaikki nohupilla.

## 1. Juna 222 (TF vain omistajan sanalla)
- Juna 222 kärki = 50200fb68 (NUI puut nimien alle, PT 11.3x; ff 5d6967444:n päälle), unity-tarkistus sh 0 (T/juna222-puut-unity-tarkistus.txt),
  natiivi-backup julkaisija/juna-222 ja juna-221 = 50200fb68d4e. wt /Users/Shared/Claude/wt/julkaisija-juna-221 detached 50200fb68. PT kirjasi junarivin.
- TF:n kaava kuten -1045 (muutosloki "1.1 (N)" mainiin ENNEN workflow runia). Laskuri P/lokit/testflight-ordinaali.txt = 222.

## 2. Ämpärit
- KS merenpohja KOKO MAAILMA (KK:n sana, TF 221 odottaa): T/ks-merenpohja-vienti.zsh → vie-maasto-massa-sisainen.zsh (case-ehto laajennettu
  kohokartta-merenpohja*-vienti-*), 699 051 tiedostoa → julisteet/maasto/2026-11-08-kohokartta-merenpohja/, alkoi 11.13, pid 39187 (aws s3 cp, 32 rinn.).
  Valmis-rivi "AJO KS merenpohja KOKO MAAILMA" + T/ks-merenpohja-vienti.out (ämpärissä N/N, CDN-otos) → KS:lle (local_740947d7-aa79-4b1e-948e-1b7dfc734364).
- KS kohokartta v6: pää pid 53921 (osat 0,1,2,4,6), osat 3,5,7 kaatuivat 139 → uusinta T/ks-kohokartta-v6-uusinta.zsh pid 43181 (lokit -osa{3,5,7}-uusinta.log).
  v6-vienti.zsh:n "osia vialla" laskee vain vika|virhe|error → tarkista itse KAIKKI 8 osan viimeinen rivi ("viety N, oli jo M, virheitä 0", ei KESKEYTYI).
  Kun kaikki 8 ok → KS:lle (KS tarkistaa CDN:n).

## 3. iPad-jono (iso iPad 00008103; pieni iPad ja iPhone unavailable)
Lukko /tmp/matkakirja-ipad.lukko; 11.57 iPadilla NS aloituslento j4 (53689). Odottavat (kaikki f1c, käännös ensin):
- NUI topoesittely 48e5654ae pid 27848 (T/nui-topoesittely-3.zsh) → L/nui-topoesittely-1-48e5654ae (8 kuvaa).
- NUI topoesittely 756f4962d pid 20407 (T/nui-topoesittely-4.zsh, odottaa 27848:aa) → L/nui-topoesittely-1-756f4962d.
- NUI lippu-442-2 1f26c51b4 pid 64155 (T/nui-lippu-442-2.zsh, odottaa 20407:ää; skenaario korjattu kaari 14) → L/nui-lippu-442-2-1f26c51b4.
- NS aloituslento j4 491bec23b pid 53689 (T/ns-aloituslento6.zsh) → L/natiiviseppa-striimi-aloituslento-4; AJETTU/VALMIS NS:lle (local_99130238-aa54-4a29-bcc9-7a023584944b).
- NS navat tav2 ffc355105 pid 34071 (T/ns-navat-tav2.zsh, odottaa 97997:ää; käännös L2 käynnissä 11.52) → L/natiiviseppa-navat-koho/tav2, napakalotti-rivi jonolokiin; NS:lle.
- PK g+f e59541a34 pid 29768 (T/pk-ositus4.zsh) yhä laitekäännöksen jonossa → kuittaus PK:lle (local_91a1bc27-6870-46aa-9886-66fd33b68880).
Kuittaukset NUI:lle local_43962c89-fc14-4098-9dd7-6153133ffcea.

## 4. Valmiit tällä vuorolla (kaikki kuitattu)
NUI kohokartta-90-1 b4e624cfe 8/8 (k90-alpit-90 = k90-valikko md5, NUI selvittää); panorointi-2 50200fb68 12/12 (uusinta); lippu-442-1 8/8 (NUI: kelvoton, oma skenaariovirhe → 442-2);
topoesittely Mac-videot: 581f7f85a, 48e5654ae (23,6 s), 756f4962d (24,6 s) L/nui-topoesittely-1-<sha>/mac/topoesittely.mp4; NS navat-koho uusi ca92af647 4/4 (uusinta, kohokansi 16/16).

## OPIT (uudet)
- iPad "failed to launch 10002 / POSIX 22" tulee ohimenevästi tuoreelle asennukselle (50200fb68, 1f26c51b4, ca92af647); paketit identtiset toimiviin, laite lukitsematon.
  Korjaus: aja sama kääre uudelleen (uusinta onnistui joka kerta). Ei omistajan tointa.
- Kääreen vaihto (kill) jättää iPad-lukon kuolleelle pid:lle: cat /tmp/matkakirja-ipad.lukko/pid; jos pid kuollut eikä devicectl-ajoa → rm -rf lukko.
- Mac-esikatselussa "komento kuva" EI tuota PNG:tä tallenteen (tallenne-alku) aikana → esikatselu.sh VIKA, mac-ajo ei kopioi. T/nui-topoesittely-*-mac.zsh hakee
  esikatselukansion lokista ja tekee mp4:n ruuduista (malli uusiin videoajoihin).
- LEVY: laitekäännös vaatii 12 Gi. PT 11.4x: JU:n laitekäännös (L/julkaisija-laite-218-<sha>) pois, kun tilaaja on KUITANNUT kuvat; säilyvät junan kärjet,
  rungot d092f48cc/2cba21a3e/10e9b6c4a ja jonon käännökset. 11.56 vapaana 51 Gi.
- Peruttaessa kesken laitekäännöksen: tapa vain kääre (ennen iPad-lukkoa trap ei tee mitään), anna laite-iso valmistua → ei orpoa kopiolukkoa.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
