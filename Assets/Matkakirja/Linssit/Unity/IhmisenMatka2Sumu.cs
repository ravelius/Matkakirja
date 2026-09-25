// IHMISEN MATKA II: KERROKSELLINEN SUMU (erä 3). Natiiviseppä 25.9.2026: omana kerroksena Linssit-puolelle — ei muutoksia
// KarttaKerroksiin eikä pallon tai laattojen varjostimiin, vain II:n aikana (kuoret tuhotaan linssin sulkeutuessa) ja
// GPU-kustannus pieni: Pilvikuoret (sama NASA Blue Marble -pilvikuva kuin astronautilla ja lennolla, yksi tekstuurinäyte
// pikseliä kohden, Cull Back); avauksessa enintään kaksi kuorta kerrallaan näkyvissä, muuten yksi.
// Logiikka (avauksen peitto kameran korkeudesta, seutujen sävyt): Linssit/Ydin/Aikajana/IhmisenMatka2Sumukuva.
//
// VALO: kuoret lukevat valokeilan (KarttaKerrokset.PaaKeila, ToinenKeila, KeilanHamaryys) ja himmenevät sen ulkopuolella
// kuten pallo, joten aamunkoitto ja hämärä pysyvät. SEUTU vaihtuu häivyttämällä vanha pois ennen uutta sävyä.
// AJELEHTIMINEN maan akselin ympäri; aikahypyn pyörre katsekohteen ympäri. Vähennetty liike: ei avausta, ei liikettä.
// AIKAHYPPY (erä 5): jakso on kahden virkkeen mittainen, ja tavallinen vaihto (vanha pois 1,25 s, uusi sisään 1,25 s)
// söi siitä puolet, joten pyörre näkyi vain hetken. Pyörre tulee nopeasti (PyorreSisaanS), pyörii aluksi kiihkeästi
// ja hidastuu kuin kelautuva kello (PyorreSyoksy, PyorreHidastusS) ja pysyy vähintään PyorreMinS seuraavan jakson alkuun.
// Komento "sumu pois|paalle" (LinssiOhjain): kehysaikojen vertailu samasta jaksosta sumun kanssa ja ilman.
// TAUKO (löydös 148): esityksen tauolla ajelehtiminen, pyörre ja häivytykset seisovat (oma kello), jatko jatkaa niitä.
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatka2Sumu : MonoBehaviour
    {
        /// <summary>Testikomento "sumu pois": kaikki kuoret piiloon (kehysaikojen vertailu). Oletus päällä.</summary>
        public static bool Pois;
        /// <summary>Seutusumun vaihto (puolet pois, puolet sisään) ja avauksen sammutus (s).</summary>
        public const float SiirtymaS = 2.5f;
        /// <summary>Pilvien hämäryyden liuku (s) keilan hämäryyden perässä.</summary>
        public const float HamaraS = 1.5f;
        /// <summary>Aikahypyn pyörre: vaihto sisään (vanha pois ja pyörre sisään kumpikin, s), vähimmäisnäkyvyys (s),
        /// alun lisänopeus ajelehtimisen kerrannaisina ja sen hiipumisen aikavakio (s).</summary>
        public const float PyorreSisaanS = 0.4f, PyorreMinS = 6f, PyorreSyoksy = 4f, PyorreHidastusS = 2.5f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => Pois = false;

        /// <summary>Esitys tauolla (IhmisenMatka2Tehosteet asettaa): sumu seisoo.</summary>
        public bool Tauolla;
        /// <summary>Sumun oma kello (s): etenee vain, kun esitys ei ole tauolla (pyörteen hidastus ja vähimmäisaika).</summary>
        float kello;

        PalloKierto kierto;
        CesiumGeoreference georeferenssi;
        Pilvikuori[] avaus;
        float[] avausKulma;
        Pilvikuori seutu;
        bool avausPaalla;
        float avausVoima, seutuPeitto, seutuKulma, pyorreKulma, hamaryys;
        float pyorreAlku = -1f;   // kun pyörre tuli näkyviin (sumun kello), muuten −1
        Sumukuva tavoite = Sumukuva.Ei, nyt = Sumukuva.Ei;
        string jaksoId;

        public static IhmisenMatka2Sumu Luo(Transform isanta, PalloKierto kierto)
        {
            var g = kierto != null ? kierto.georeferenssi : null;
            if (g == null) return null;
            var s = new GameObject("Sumu").AddComponent<IhmisenMatka2Sumu>();
            s.transform.SetParent(isanta, false);
            s.kierto = kierto;
            s.georeferenssi = g;
            int n = IhmisenMatka2Sumukuva.Avaus.Length;
            s.avaus = new Pilvikuori[n];
            s.avausKulma = new float[n];
            for (int i = 0; i < n; i++)
            {
                var k = IhmisenMatka2Sumukuva.Avaus[i];
                s.avaus[i] = Pilvikuori.Luo(g);
                s.avaus[i]?.Korkeus(k.KorkeusKm * 1000.0);
                s.avausKulma[i] = k.Kulma;
            }
            s.seutu = Pilvikuori.Luo(g);
            s.seutu?.Korkeus(IhmisenMatka2Sumukuva.SeutuKm * 1000.0);
            // Pilvikartan aavikoilla (Sahara, Arabia) ei ole pilviä: usva saa tasaisen pohjan (simulaattori 25.9.).
            s.seutu?.Tasainen(IhmisenMatka2Sumukuva.SeutuPohja);
            s.Paivita(0f);
            return s;
        }

        /// <summary>Jakso alkaa: avauksen kuoret jaksoissa avaus–jebel-irhoud, seutusumu jakson seudusta.</summary>
        public void Jakso(KertomusJakso j)
        {
            if (j == null) return;
            jaksoId = j.Id;
            avausPaalla = IhmisenMatka2Sumukuva.AvausJaksossa(j.Id);
            tavoite = IhmisenMatka2Sumukuva.Seutu(j.Id);
            LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: sumu {j.Id} (avaus {(avausPaalla ? "päällä" : "pois")}, " +
                $"seutu {tavoite.Peitto:0.00}{(tavoite.Pyorre ? " pyörre" : "")})");
        }

        /// <summary>Esitys loppuu tai linssi avautuu tutkimusvaiheeseen: sumu hälvenee.</summary>
        public void Loppu()
        {
            avausPaalla = false;
            tavoite = Sumukuva.Ei;
            pyorreAlku = -1f;   // loppu ei odota pyörteen vähimmäisaikaa
        }

        void Update() => Paivita(Tauolla ? 0f : Time.unscaledDeltaTime);

        void Paivita(float dt)
        {
            kello += dt;
            bool vahennetty = LinssiOhjain.Instanssi != null && LinssiOhjain.Instanssi.VahennettyLiike;
            hamaryys = Mathf.MoveTowards(hamaryys, KarttaKerrokset.KeilanHamaryys, dt / HamaraS);
            // Keilat lasketaan vain, kun jokin kuori näkyy (Cesium-muunnokset).
            bool keilatLaskettu = false;
            Vector3 sa = default, sb = default;
            float ua = 2f, ia = 2f, va = 0f, ub = 2f, ib = 2f, vb = 0f;
            void Keilat()
            {
                if (keilatLaskettu) return;
                keilatLaskettu = true;
                (sa, ua, ia, va) = Keila(KarttaKerrokset.PaaKeila);
                (sb, ub, ib, vb) = Keila(KarttaKerrokset.ToinenKeila);
            }

            // AVAUS: kuoret kameran korkeuden mukaan; kaikki pehmeästi pois avauksen jälkeen.
            avausVoima = Mathf.MoveTowards(avausVoima, avausPaalla && !Pois && !vahennetty ? 1f : 0f, dt / SiirtymaS);
            double kamera = kierto != null ? kierto.korkeus : 0.0;
            for (int i = 0; i < avaus.Length; i++)
            {
                var p = avaus[i];
                if (p == null) continue;
                var k = IhmisenMatka2Sumukuva.Avaus[i];
                double peitto = avausVoima * k.Peitto * IhmisenMatka2Sumukuva.AvauksenOsuus(kamera, k.KorkeusKm * 1000.0);
                p.Peitto(peitto);
                if (peitto <= 0.001) continue;
                if (!vahennetty) avausKulma[i] += k.Ajelehtiminen * dt;
                p.Kierto(Quaternion.AngleAxis(avausKulma[i], p.Akseli));
                Keilat();
                p.Valaistus(hamaryys, sa, ua, ia, va, sb, ub, ib, vb);
            }

            // SEUTU: vanha häipyy ennen uutta sävyä; sama sävy jatkuu katkeamatta.
            if (seutu == null) return;
            // Avauksen aikana ei seutusumua: kerrallaan enintään kaksi kuorta (Natiivisepän ehto: kevyt).
            // Näkyvä pyörre pitää paikkansa vähimmäisajan, vaikka seuraava jakso jo alkoi.
            bool pyorrePitaa = nyt.Pyorre && pyorreAlku >= 0f && kello - pyorreAlku < PyorreMinS;
            bool sama = Sama(nyt, tavoite) || (pyorrePitaa && !Pois && !avausPaalla);
            float kohde = Pois || !sama || avausPaalla ? 0f : (pyorrePitaa ? nyt.Peitto : tavoite.Peitto);
            float vaihto = tavoite.Pyorre && !nyt.Pyorre || nyt.Pyorre && sama ? PyorreSisaanS : SiirtymaS * 0.5f;
            seutuPeitto = Mathf.MoveTowards(seutuPeitto, kohde, dt / vaihto);
            if (!sama && seutuPeitto <= 0.001f)
            {
                nyt = tavoite;
                seutu.Savy(new Color(nyt.R, nyt.G, nyt.B, 1f));
                seutuKulma += 137.5f;   // uusi seutu, uusi pilvikuvio
                pyorreAlku = nyt.Pyorre ? kello : -1f;
                // Pyörteen kierto on kameran katseen akselilla: seuraava seutu ei saa periä sitä (kuvio liukuisi
                // kameran mukana). Vaihto tapahtuu peiton ollessa 0, joten nollaus ei näy.
                if (!nyt.Pyorre) pyorreKulma = 0f;
            }
            seutu.Peitto(seutuPeitto);
            if (seutuPeitto <= 0.001f) return;
            if (!vahennetty)
            {
                if (nyt.Pyorre)
                {
                    // Kelautuva kello: kiihkeä alku, joka hidastuu ajelehtimisen nopeuteen.
                    float t = pyorreAlku >= 0f ? kello - pyorreAlku : PyorreMinS;
                    pyorreKulma += nyt.Ajelehtiminen * (1f + PyorreSyoksy * Mathf.Exp(-t / PyorreHidastusS)) * dt;
                }
                else seutuKulma += nyt.Ajelehtiminen * dt;
            }
            var q = Quaternion.AngleAxis(seutuKulma, seutu.Akseli);
            if (pyorreKulma != 0f && kierto != null)
                q = Quaternion.AngleAxis(pyorreKulma, Pilvikuori.Suunta(georeferenssi, kierto.leveys, kierto.pituus)) * q;
            seutu.Kierto(q);
            Keilat();
            seutu.Valaistus(hamaryys, sa, ua, ia, va, sb, ub, ib, vb);
        }

        static bool Sama(Sumukuva a, Sumukuva b) =>
            a.R == b.R && a.G == b.G && a.B == b.B && a.Peitto == b.Peitto && a.Pyorre == b.Pyorre;

        /// <summary>Keila pilvien varjostimelle: suunta, cos ulko- ja sisäreuna (säde ± puolet pehmeydestä), voimakkuus.</summary>
        (Vector3 suunta, float ulko, float sisa, float voima) Keila(KarttaKerrokset.Keila? k)
        {
            if (k is not { } v || georeferenssi == null) return (Vector3.forward, 2f, 2f, 0f);
            float kulma = v.sadeKm / 6371f, p = Mathf.Clamp(v.pehmeys, 0.05f, 1f) * 0.5f;
            return (Pilvikuori.Suunta(georeferenssi, v.lat, v.lon), Mathf.Cos(kulma * (1f + p)), Mathf.Cos(kulma * (1f - p)),
                Mathf.Clamp01(v.voimakkuus));
        }

        /// <summary>Tila lokiin (komento "sumu tila").</summary>
        public string Kuvaus() =>
            $"sumu {jaksoId ?? "-"}: avaus {avausVoima:0.00} [{string.Join(", ", System.Array.ConvertAll(avaus, p => p != null && p.gameObject.activeSelf ? "näkyy" : "pois"))}], " +
            $"seutu {seutuPeitto:0.00}{(nyt.Pyorre ? " pyörre" : "")}, hämäryys {hamaryys:0.00}{(Pois ? ", POIS" : "")}";

        void OnDestroy()
        {
            // Vain II:n aikana: kuoret ovat georeferenssin lapsia, joten ne tuhotaan tässä erikseen.
            if (avaus != null) foreach (var p in avaus) if (p != null) Destroy(p.gameObject);
            if (seutu != null) Destroy(seutu.gameObject);
        }
    }
}
