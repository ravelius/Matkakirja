# Julkaisija: luovutus 8.11.2026 klo 04.25 (korvaa -0200:n; -0003:n ALOITA, OPIT ja ODOTTAA SANAA voimassa: git show 75df8de5b:docs/raportit/viesti-julkaisija-luovutus-20261108-0003.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: kuten -0003 (Monitor jonolokiin, grep lisäksi 'laitekaannos VALMIS'; tail jonolokista). KÄYNNISSÄ 04.25: NUI kohokartta-v5-3 d1e046110 pid 97930 (T/nui-kohokartta-v5-3.zsh, sama .app, iPad, vahti päällä, 9 kuvaa) → kun jonolokiin "AJO NUI kohokartta-v5-3": kuittaus NUI:lle (local_43962c89-fc14-4098-9dd7-6153133ffcea): kuvia, vahti-VIKA, tarkka-huippu, puuttuvat kuvat, VIKA-lähetys, kansio lokit/nui-kohokartta-v5-3-d1e046110. Muuten jono tyhjä (vain pysyvä T/valoseppa-vahti.zsh). Rivi PT:lle "JONO TYHJÄ: Julkaisija", jos mitään ei tule.

## 1. Juna 221 = c92dafe1f (TF VAIN OMISTAJAN SANALLA)
Natiivi-backup julkaisija/juna-221, worktree /Users/Shared/Claude/wt/julkaisija-juna-221. Kaikki ff, unity-tarkistus sh 0 joka kerta, taululla (juna.py lisaa):
330a43515 → c8a70ad5e (NS ASTC) → ab113e0ac (PK lataus; sisältää 61f63adb9, PT 03.4x) → 808b502b4 (NS vaihe 1) → c92dafe1f (PK keisarin lähtö).
ODOTTAA PT:N SANAA: NUI:n puut 54b7c832c (omistajan hyväksyntä KK:lta ensin; älä liitä ennen PT:n sanaa). Muuta ei odota.

## 2. Kuitattu tällä vuorolla (02.09–04.25)
PK iPad-sarja 2 + tahti4-1 (kaikki ELOSSA); PK keisari-ohje esikatselu 3/3 (lokit/esikatselu-20261108-0215/-0219/-0223).
NS valitsin n3 + valitsin2 kauas n4; NS striimi221 v1+k1 VALMIS.
NUI puut4 3971e6540: pois SEIS vahti 8/11 (4149), päällä VALMIS 11/11 (4029).
Muistityö juna221-tuileries c92dafe1f: 11/11, huippu 3322 Mt, vahti 0 (NS:lle).
KS kohokartta v5 ämpärissä 87381/87381 (https://media.matkakirja.app/linssit/topografia/kohokartta/v5-20261108/{z}/{x}/{y}.jpg), osoite NUI:lle ja KS:lle; kohokartta-5 decf8bef4 8/8 KS:lle.
NUI kohokartta-v5-1 06a554d79: SEIS vahti 4080 Mt kohokartan kytkennän jälkeen, 1/9. kohokartta-v5-2 d1e046110: 6/9, huippu 2777, vahti 0, 3 koho-kuvaa puuttuu + 2 lähetysvikaa (NUI:lle 04.24).

## OPIT
- T7-projekti (proto-natiiviseppa-unity67) on SAMA L1:lle ja L2:lle laite-sha.sh:ssa (vain lukko eri). Laitekäännökset AINA T/laite-iso.zsh:n kautta (kopiolukko /tmp/ju-laite-kopio.lukko) tai ota KM itse ennen laite-sha.sh:ta. 02.06: ns-striimi221/ns-valitsin kutsuivat laite-sha.sh:ta ohi lukon → puut4:n .app oli a0a9364e (peruttu). Tarkista aina kaannos.txt ennen iPad-ajoa.
- iPad "failed to launch" (CoreDevice 10002 / POSIX 22) tuoreen asennuksen jälkeen = devicectl --console -käynnistys, EI sovellus (ei .ips-raporttia 8.11.). T/ipad-skenaario-f1.zsh korjattu 04.0x: epäonnistuneen yrityksen jälkeen tavallinen käynnistys + sulku (vanha: .ennen-konsolikorjaus-20261108). kv5-2 käynnistyi 1. yrityksellä.
- vie-paketti.sh rinnakkaisosat kaatuvat paluulla 139 (KESKEYTYI); pääskriptin "valmis" ei tunnista sitä (grep vain vika/virhe/error). Tarkista jokaisen osan viimeinen rivi; uusinta samalla --osa=N/8 jatkaa (412 = oli jo).
- NUI:n esikatselumuotoinen skenaario ("kuva X ...") ei toimi f1:llä: muunna "komento kuva X" + odota 3 (esim. T/sk-kohokartta-v5-1-ipad.txt).
- Uudet pohjaskriptit: T/mt-juna221-tuileries.zsh ja T/nui-kohokartta-v5-2.zsh (yksi iPad-ajo, laitekäännös, vahti päällä): kopioi, vaihda SHA, K, SK, aja8-nimi.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
