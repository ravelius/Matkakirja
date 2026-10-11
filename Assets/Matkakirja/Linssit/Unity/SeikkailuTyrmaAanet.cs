// HISTORIAMOOTTORI: TYRMÄN ÄÄNIYMPÄRISTÖ UNITYSSA (Pelikoodari 11.10.2026; PT:n Olavinlinna-yösuunnitelma B3; ajastin Ydin TyrmanAanet).
// Pelissä jo olevat äänet: tippuva vesi holvista (Soundly kaivo-01…06), kaukaiset askeleet käytävällä oven takana (Soundly askel-kivi,
// vartijan askelten mikseritasolla), avainten kilinä (avainnippu → Soundly avain-07…12), raollaan olevan oven narahdus (sonniss
// puuovi-narina-2) ja irtokiven rapina (kivi-irtoaa). Kaikki 3D:nä kuulokehyksessä (SeikkailuKuulija), joten suunta ohjaa pelaajaa.
// Muurin tippumistausta (SeikkailuSade tippuminen-muuri) jatkuu alla ennallaan. SeikkailuTyrma lisää tämän itselleen.
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTyrmaAanet : MonoBehaviour
    {
        static readonly string[] Tipat = { "kaivo-01", "kaivo-02", "kaivo-03", "kaivo-04", "kaivo-05", "kaivo-06" };
        /// <summary>Askelia kauempana käytävällä ja väli (s): ohikulku sivusuunnassa oven takana.</summary>
        const int AskelMaara = 8; const float AskelValiS = 0.62f, KaytavaM = 3.5f, OhikulkuM = 7f, TippaKorkeusM = 2.3f;

        SeikkailuTyrma tyrma; TyrmanAanet ajastin;
        readonly List<TyrmanAani> soitettavat = new List<TyrmanAani>();
        Vector3 istuin, ovi, rako, avaimet, ryomi;
        System.Action<string> kirjaa; bool kirjattu;

        public void Alusta(SeikkailuTyrma t, Vector3 istuin, Vector3 ovi, Vector3 rako, Vector3 avaimet, Vector3 ryomi, System.Action<string> kirjaa)
        {
            tyrma = t; this.istuin = istuin; this.ovi = ovi; this.rako = rako; this.avaimet = avaimet; this.ryomi = ryomi; this.kirjaa = kirjaa;
            ajastin = new TyrmanAanet(Random.Range(0, int.MaxValue));
        }

        void Update()
        {
            if (tyrma == null || ajastin == null) return;
            var y = tyrma.Ydin;
            ajastin.Paivita(Time.deltaTime, y.Muunnelma, y.Vaihe, y.Aika, soitettavat);
            foreach (var a in soitettavat) Soita(a);
        }

        void Soita(TyrmanAani a)
        {
            if (!kirjattu) { kirjattu = true; kirjaa?.Invoke("seikkailu: tyrmän ääniympäristö päällä"); }
            float r = (float)ajastin.Satunnainen();
            switch (a)
            {
                case TyrmanAani.Tippa:
                {
                    // Satunnainen kohta holvissa 1–3 m pelaajan istuimesta; pisarat eri kokoisia (sävel 0,85–1,2).
                    float kulma = r * Mathf.PI * 2f, m = 1f + 2f * (float)ajastin.Satunnainen();
                    var paikka = istuin + new Vector3(Mathf.Cos(kulma) * m, TippaKorkeusM, Mathf.Sin(kulma) * m);
                    SeikkailuAanet.Soita(Tipat[(int)(ajastin.Satunnainen() * Tipat.Length) % Tipat.Length], paikka, 0.6f + 0.3f * r, 0.85f + 0.35f * (float)ajastin.Satunnainen());
                    break;
                }
                case TyrmanAani.Askeleet: StartCoroutine(Ohikulku(r < 0.5f)); break;
                case TyrmanAani.AvainRaossa: SeikkailuAanet.Soita("avainnippu", rako, 0.55f); break;
                case TyrmanAani.AvainOlissa: SeikkailuAanet.Soita("avainnippu", avaimet + Vector3.up * 0.1f, 0.3f, 1.1f); break;
                case TyrmanAani.OviVeto: SeikkailuAanet.SoitaJokin(SeikkailuAanet.OviNarina, "ovi-narahdus", ovi + Vector3.up, 0.3f, 0.9f); break;
                case TyrmanAani.KiviRapina: SeikkailuAanet.Soita("kivi-irtoaa", ryomi + Vector3.up * 0.3f, 0.3f, 1.25f); break;
            }
        }

        /// <summary>Vartija kulkee käytävällä oven takana sivusuunnassa (vasemmalta oikealle tai päinvastoin), ei pysähdy.</summary>
        System.Collections.IEnumerator Ohikulku(bool vasemmalta)
        {
            var ulos = ovi - istuin; ulos.y = 0; ulos = ulos.sqrMagnitude > 1e-4f ? ulos.normalized : Vector3.forward;
            var sivu = Vector3.Cross(Vector3.up, ulos) * (vasemmalta ? 1f : -1f);
            var keski = ovi + ulos * KaytavaM;
            for (int i = 0; i < AskelMaara; i++)
            {
                var klippi = SeikkailuAanet.Askel("kivi", false) ?? SeikkailuVartijat.AskelKlippi;
                if (klippi == null) yield break;
                float osuus = i / (float)(AskelMaara - 1);
                var l = SeikkailuKuulija.Lahde("Tehoste:" + SeikkailuVartijat.VartijanAskeleet, 2f, 25f);
                SeikkailuKuulija.Aseta(l, keski + sivu * Mathf.Lerp(-OhikulkuM, OhikulkuM, osuus) * 0.5f);
                // Kaukana ja holvin takana: hiljainen ja tumma (sävel alas), keskellä kuuluvin.
                l.clip = klippi; l.pitch = 0.88f; l.volume = (0.35f + 0.2f * Mathf.Sin(osuus * Mathf.PI)) * SeikkailuAanet.Taso("tehosteet", SeikkailuVartijat.VartijanAskeleet);
                l.Play(); Destroy(l.gameObject, klippi.length / l.pitch + 0.2f);
                yield return new WaitForSeconds(AskelValiS);
            }
        }
    }
}
