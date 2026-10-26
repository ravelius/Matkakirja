/**
 * JULKAISUN PUHEMOOTTORITARKISTUS (Fable 27.9.2026: "savukkeeseen tarkistus
 * x-puhe-moottori = xai tuotannossa"; omistaja 5.10.2026: lukijat ElevenLabsilla → oletus eleven).
 *
 * Pyytää julkaistulta workerilta yhden lyhyen puhepalan ja vaatii, että
 * vastauksen x-puhe-moottori on odotettu (eleven, kun ELEVEN_API_KEY on
 * asetettu; xai on enää varapolku). Pala on lohkossa 'savuke', joten se generoidaan kerran ja
 * tulee sen jälkeen R2:sta — tarkistus ei maksa joka julkaisulla.
 * Salaisuuden asetus vaatii hetken levitä, siksi muutama uusinta.
 *
 *   node tools/pollo/tarkista-puhemoottori.mjs <workerin osoite> <origin> [odotettu=eleven]
 */
export async function tarkistaPuhemoottori(osoite, origin, odotettu = 'eleven', {
  yrityksia = 6, viiveMs = 5000, haku = fetch,
} = {}) {
  let viimeinen = null;
  for (let i = 0; i < yrityksia; i += 1) {
    try {
      const v = await haku(osoite, {
        method: 'POST',
        headers: { 'content-type': 'application/json', origin },
        body: JSON.stringify({
          tehtava: 'puhe', teksti: 'Matkakirjan julkaisutarkistus.', persoona: 'kertoja', lohko: 'savuke',
        }),
      });
      await v.arrayBuffer();
      viimeinen = { status: v.status, moottori: v.headers.get('x-puhe-moottori'), lahde: v.headers.get('x-puhe-lahde') };
      if (v.status === 200 && viimeinen.moottori === odotettu) return { ok: true, ...viimeinen };
    } catch (virhe) {
      viimeinen = { virhe: String(virhe?.message ?? virhe) };
    }
    if (i < yrityksia - 1) await new Promise((r) => setTimeout(r, viiveMs));
  }
  return { ok: false, ...viimeinen };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [osoite, origin, odotettu = 'eleven'] = process.argv.slice(2);
  const tulos = await tarkistaPuhemoottori(osoite, origin, odotettu);
  console.log(`puhemoottori: ${JSON.stringify(tulos)}`);
  if (!tulos.ok) process.exit(1);
}
