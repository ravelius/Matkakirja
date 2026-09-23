// LIVIA (PULU): yhden ruudun tila ja eleluettelo (Natiivi-UI, 23.9.2026).
//
// Verkkopelin kokopulu piirtyy js/livia-svg.js:n ja js/livia-uudet-versiot.js:n
// SVG-paperinukkena. Natiivissa samaa piirtoa kutsutaan LiviaKuva.Aseta(tila)
// -kutsulla joka ruudussa, jolloin tila vastaa webin js/livia-eleet.js:n
// piirraNyt-kutsua: ele (id), edistyminen p, puheen nokkavaihe, karttaleijunnan
// korkeus, astronauttiasu ja oikean reunan lisätila. Eleiden ajoitus ja valinta
// (livia-eleet.js:n ohjain) eivät kuulu tähän: kutsuja päättää, mikä ele on
// käynnissä ja kuinka pitkällä se on (LiviaEleet.KestoMs).
using System.Collections.Generic;

namespace Matkakirja.Natiivi
{
    /// <summary>Yhden ruudun asento.</summary>
    public sealed class LiviaTila
    {
        /// <summary>Webin ele-id (LiviaEleet.Kaikki), esim. "blink", "welcome", "flyAway".</summary>
        public string Ele = "blink";
        /// <summary>Eleen edistyminen 0..1 (0 ja 1 = lepo, paitsi tulo- ja poistumiseleissä).</summary>
        public float P;
        /// <summary>Puheen nokkavaihe 0..1 (webin (nyt − puheAlku) % 1500 / 1500), −1 = ei puhu.</summary>
        public float Puhe = -1f;
        /// <summary>Karttaleijunnan korkeus 0..1 (webin mapHover.height).</summary>
        public float Leiju;
        /// <summary>Lisähengitys 0..1 (lisätään eleen omaan hengitysrataan).</summary>
        public float Hengitys;
        /// <summary>Astronautin kameran kypärä ja leijunta.</summary>
        public bool Astronautti;
        /// <summary>Lisäleveys oikealle kuten webin `right` (viewBox 152 + Oikealle).</summary>
        public float Oikealle;

        // --- valinnaiset lisäkentät (webin piirraNyt-kutsun muut kentät) ---------

        /// <summary>Eleen voimakkuus 0..1; negatiivinen = webin livianEleenVoima(ele).</summary>
        public float Voimakkuus = -1f;
        /// <summary>Leijunnan siipivaihe radiaaneina; NaN = kello (webin nyt / 180 ms).</summary>
        public float LeijuVaihe = float.NaN;
        /// <summary>Puheäänen vihjeen kesto (ms): cityExplain kävelee vain pitkässä selityksessä (≥ 5600 ms).</summary>
        public float CueKestoMs;
        /// <summary>Puheäänen toistonopeus (cityExplainin variantti).</summary>
        public float Toistonopeus = 1f;
        /// <summary>Lasit 0..1 (lehti auki); negatiivinen = eleen oma arvo.</summary>
        public float Lasit = -1f;
        /// <summary>Katse ylös (matkakirjan luennan kuuntelu, webin gazeUp).</summary>
        public bool KatseYlos;
        /// <summary>Rekvisiitta oikealle (chat auki, webin propsRight).</summary>
        public bool RekvisiittaOikealla;
        /// <summary>Kapea ruutu: cityExplain astuu lyhyemmän matkan (webin compactExplain).</summary>
        public bool Kapea;

        /// <summary>Sama tila kentittäin (LiviaKuva ei kokoa eikä maalaa samaa ruutua uudelleen).</summary>
        internal bool Sama(LiviaTila t) =>
            Ele == t.Ele && P.Equals(t.P) && Puhe.Equals(t.Puhe) && Leiju.Equals(t.Leiju) && Hengitys.Equals(t.Hengitys)
            && Astronautti == t.Astronautti && Oikealle.Equals(t.Oikealle) && Voimakkuus.Equals(t.Voimakkuus)
            && LeijuVaihe.Equals(t.LeijuVaihe) && CueKestoMs.Equals(t.CueKestoMs) && Toistonopeus.Equals(t.Toistonopeus)
            && Lasit.Equals(t.Lasit) && KatseYlos == t.KatseYlos && RekvisiittaOikealla == t.RekvisiittaOikealla && Kapea == t.Kapea;

        public void Kopioi(LiviaTila t)
        {
            Ele = t.Ele; P = t.P; Puhe = t.Puhe; Leiju = t.Leiju; Hengitys = t.Hengitys; Astronautti = t.Astronautti;
            Oikealle = t.Oikealle; Voimakkuus = t.Voimakkuus; LeijuVaihe = t.LeijuVaihe; CueKestoMs = t.CueKestoMs;
            Toistonopeus = t.Toistonopeus; Lasit = t.Lasit; KatseYlos = t.KatseYlos; RekvisiittaOikealla = t.RekvisiittaOikealla; Kapea = t.Kapea;
        }
    }

    /// <summary>Pelin Livia-eleet (webin LIVIAN_UUDET_PELIELEET).</summary>
    public static class LiviaEleet
    {
        static readonly List<string> kaikki = new List<string>();
        static readonly Dictionary<string, int> indeksi = new Dictionary<string, int>();

        static LiviaEleet()
        {
            for (int i = 0; i < LiviaData.Eleet.Length; i++)
            {
                kaikki.Add(LiviaData.Eleet[i].Id);
                indeksi[LiviaData.Eleet[i].Id] = i;
            }
        }

        /// <summary>Kaikki pelissä käytettävät ele-id:t (myös vain SVG:ssä olevat, esim. glideIn, bunFeast).</summary>
        public static IReadOnlyList<string> Kaikki => kaikki;

        /// <summary>Pelin kesto millisekunteina (0 = tuntematon ele).</summary>
        public static float KestoMs(string id) => id != null && indeksi.TryGetValue(id, out var i) ? LiviaData.Eleet[i].Kesto : 0f;

        /// <summary>Webin ryhmä: "Pieni ele", "Pää", "Ilme", "Puhe", "Touhu", "Liike" tai "Pelitilanne"; null = tuntematon.</summary>
        public static string Ryhma(string id) => id != null && indeksi.TryGetValue(id, out var i) ? LiviaData.Eleet[i].Ryhma : null;

        /// <summary>Suomenkielinen nimi (webin label); null = tuntematon.</summary>
        public static string Nimi(string id) => id != null && indeksi.TryGetValue(id, out var i) ? LiviaData.Eleet[i].Nimi : null;

        public static bool Olemassa(string id) => id != null && indeksi.ContainsKey(id);
    }
}
