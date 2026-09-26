using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// LENTO V3: Tiger Mothin olio ja elävyys (Linssiseppä; speksi docs/raportit/lento-v3-speksi.md kohta 4). Natiivisepän
    /// Nappulan v3-haara luo koneen <see cref="Luo"/>-kutsulla omalla materiaalillaan (seepiavarjostin ja ääriviiva kuten
    /// erikoismalleissa) ja kutsuu <see cref="Aseta"/> joka kehys lennon ajalla t (0–15 s) ja lennon siemenellä:
    ///   - Runko-lapsi saa EI MONOTONIAA -elon (LennonV3.Elo: pystyheilunta, puuskat, nokan ja kyljen heilahdus) ja kallistuksen
    ///     sekä nokan kulman; juuren paikka ja suunta ovat Nappulan (reitti, LennonV3.ReitinKohta).
    ///   - Potkuri-lapsi (nimi "Potkuri", napa origossa, akseli +Z) pyörii Potkurit-komponentilla, jonka nopeus seuraa
    ///     kierroksia (PotkuriKiekko ja moottorin ääni samoista kierroksista, LentoAani Pelikoodarilla).
    ///   - Huivi-lapsi (Foggin huivi) lepattaa 2,5–4 Hz amplitudi kohinana kiinnityksen ympäri.
    /// Juuren mittakaava: yläsiiven kärkiväli 1,0 yksikköä (speksissä pelissä 5 km).
    /// </summary>
    public sealed class TigerMothKone : MonoBehaviour
    {
        public Transform Runko, Huivi;
        public Potkurit Potkurit;
        /// <summary>Potkurin täysi nopeus (°/s) kierroksilla 1; Potkurit-komponentin oletus on 900.</summary>
        public float PotkurinNopeus = 900f;

        static Mesh runkoVerkko, potkuriVerkko, huiviVerkko;

        /// <summary>Luo koneen isän alle: juuri (Nappula liikuttaa), Runko (elo), Potkuri ja Huivi Rungon lapsina.</summary>
        public static TigerMothKone Luo(Transform isa, Material materiaali)
        {
            if (runkoVerkko == null) runkoVerkko = Symbolimallit.TigerMothRunko();
            if (potkuriVerkko == null) potkuriVerkko = Symbolimallit.TigerMothPotkuri();
            if (huiviVerkko == null) huiviVerkko = Symbolimallit.TigerMothHuivi();
            var juuri = new GameObject("TigerMoth");
            juuri.transform.SetParent(isa, false);
            var kone = juuri.AddComponent<TigerMothKone>();
            kone.Runko = Kappale(juuri.transform, "Runko", runkoVerkko, materiaali, Vector3.zero);
            Kappale(kone.Runko, "Potkuri", potkuriVerkko, materiaali, Symbolimallit.TigerMothNapa);
            kone.Huivi = Kappale(kone.Runko, "Huivi", huiviVerkko, materiaali, Symbolimallit.TigerMothHuivinKiinnitys);
            kone.Potkurit = juuri.AddComponent<Potkurit>();
            return kone;
        }

        static Transform Kappale(Transform isa, string nimi, Mesh verkko, Material materiaali, Vector3 paikka)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(isa, false);
            go.transform.localPosition = paikka;
            go.AddComponent<MeshFilter>().sharedMesh = verkko;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go.transform;
        }

        /// <summary>
        /// Elo hetkellä t (s) lennon siemenellä: Rungon paikallinen siirto ja kierto (kallistus = reitin kaarros + puuskat,
        /// nokka = LennonV3.NokanKulma + heilahdus), potkurin nopeus kierroksista ja huivin lepatus.
        /// </summary>
        public void Aseta(double t, int siemen, double reitinKallistus)
        {
            var e = LennonV3.Elo(t, siemen);
            if (Runko != null)
            {
                Runko.localPosition = new Vector3(0f, (float)e.Pysty, 0f);
                // Unityn kierrot: nokka ylös = −X, kallistus oikealle = −Z (+Z nokan suuntaan).
                Runko.localRotation = Quaternion.Euler(-(float)(LennonV3.NokanKulma(t) + e.Nokka), (float)e.Sivu,
                    -(float)(reitinKallistus + e.Kallistus));
            }
            if (Potkurit != null) Potkurit.nopeus = PotkurinNopeus * (float)e.Kierrokset;
            if (Huivi != null)
            {
                // Lepatus: kaksi taajuutta (2,5 ja 3,7 Hz) ja amplitudin kohina, kiinnityksen ympäri ylös-alas ja sivulle.
                float a = 0.7f + 0.3f * Mathf.Sin((float)t * 0.9f + siemen);
                float ylos = a * (9f * Mathf.Sin((float)t * 2f * Mathf.PI * 2.5f) + 4f * Mathf.Sin((float)t * 2f * Mathf.PI * 3.7f + 1.3f));
                float sivu = a * 6f * Mathf.Sin((float)t * 2f * Mathf.PI * 3.1f + 0.4f);
                Huivi.localRotation = Quaternion.Euler(ylos, sivu, 0f);
            }
        }
    }
}
