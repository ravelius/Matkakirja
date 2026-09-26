using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// SYMBOLIMALLIT MAASTON PINNALLE (Mallinsepän löydös 27.9. klo 01.3x: vuoren symboli Olympoksella ei näkynyt, koska mallit
    /// istuivat ellipsoidin korkeudella 0 ja liioiteltu maasto (KorkeusKerroin, oletus × 2: 2 900 m → 5,8 km) peitti ne).
    /// Pinnan korkeus luetaan Cesiumin SampleHeightMostDetailed-kyselyllä kerran nostoa kohden, erissä
    /// (<see cref="KorkeusEra"/> pistettä, väli <see cref="KorkeusVali"/> s, yksi kysely kerrallaan) samoin kuin PalloKierto
    /// lukee maaston silmän alta. Malli nostetaan piirretylle pinnalle KorkeusKerroin.Sovita(h). Ennen vastausta malli on
    /// ellipsoidilla (entinen käytös), ellipsoidipohjalla (maasto pois) korkeus on 0. Komento `symbolit maasto 0|1`.
    /// Kertoimen vaihto ajossa (komento `korkeus`) ei siirrä jo nostettuja malleja (kokeilukomento).
    /// </summary>
    public sealed partial class Symbolimallit
    {
        public static bool MaastoKorkeudet = true;
        const int KorkeusEra = 24;
        const float KorkeusVali = 0.5f;

        readonly Dictionary<string, double> korkeudet = new Dictionary<string, double>(StringComparer.Ordinal);
        readonly HashSet<string> korkeusPyydetty = new HashSet<string>(StringComparer.Ordinal);
        readonly List<(string id, double lat, double lon)> korkeusJono = new List<(string, double, double)>();
        readonly List<string> kyselyIdt = new List<string>();
        Task<CesiumSampleHeightResult> korkeusKysely;
        Cesium3DTileset maastoPallo;
        float seuraavaKorkeus;
        /// <summary>Kasvaa, kun korkeuksia tulee (tasojen 2–3 uudelleenlaskenta).</summary>
        int maastoVersio;

        /// <summary>Pinnan korkeus (m ellipsoidista, liioittelematon), jos tiedossa; muuten pyyntö jonoon ja false.</summary>
        bool PinnanKorkeus(string id, double lat, double lon, out double h)
        {
            h = 0.0;
            if (!MaastoKorkeudet) return true;
            if (korkeudet.TryGetValue(id, out h)) return true;
            if (korkeusPyydetty.Add(id)) korkeusJono.Add((id, lat, lon));
            return false;
        }

        /// <summary>Paikka, asento ja normaali piirretyllä maanpinnalla (korkeus <paramref name="h"/> liioiteltuna).</summary>
        void Asento(double lat, double lon, double h, out Vector3 paikka, out Quaternion asento, out Vector3 normaali)
        {
            Asento(lat, lon, out paikka, out asento, out normaali);
            if (h > 0.0) paikka += normaali * (float)KorkeusKerroin.Sovita(h);
        }

        void KaikkiNollaan()
        {
            foreach (var (id, _, _) in korkeusJono) korkeudet[id] = 0.0;
            korkeusJono.Clear();
            maastoVersio++;
        }

        /// <summary>Kyselyn tulos talteen ja seuraava erä (LateUpdaten alussa).</summary>
        void PaivitaKorkeudet()
        {
            if (korkeusKysely != null)
            {
                if (!korkeusKysely.IsCompleted) return;
                var t = korkeusKysely;
                korkeusKysely = null;
                var r = !t.IsFaulted && !t.IsCanceled ? t.Result : null;
                for (int i = 0; i < kyselyIdt.Count; i++)
                {
                    bool ok = r != null && r.sampleSuccess != null && i < r.sampleSuccess.Length && r.sampleSuccess[i];
                    korkeudet[kyselyIdt[i]] = ok ? Math.Max(0.0, r.longitudeLatitudeHeightPositions[i].z) : 0.0;
                }
                kyselyIdt.Clear();
                maastoVersio++;
                PallonLepo.Muuttui("symbolimallit");
            }
            if (korkeusJono.Count == 0 || Time.unscaledTime < seuraavaKorkeus) return;
            if (maastoPallo == null && georeferenssi != null) maastoPallo = georeferenssi.GetComponentInChildren<Cesium3DTileset>();
            if (maastoPallo == null || maastoPallo.tilesetSource != CesiumDataSource.FromUrl) { KaikkiNollaan(); return; }
            int n = Math.Min(KorkeusEra, korkeusJono.Count);
            var pisteet = new double3[n];
            for (int i = 0; i < n; i++)
            {
                var (id, lat, lon) = korkeusJono[i];
                pisteet[i] = new double3(lon, lat, 0.0);
                kyselyIdt.Add(id);
            }
            korkeusJono.RemoveRange(0, n);
            seuraavaKorkeus = Time.unscaledTime + KorkeusVali;
            try { korkeusKysely = maastoPallo.SampleHeightMostDetailed(pisteet); }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA symbolimallit: maastokysely kaatui: " + e.Message);
                foreach (var id in kyselyIdt) korkeudet[id] = 0.0;
                kyselyIdt.Clear();
                maastoVersio++;
            }
        }
    }
}
