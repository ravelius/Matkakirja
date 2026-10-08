using System;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// PÄIVÄN JA YÖN RAJA SEKÄ EUROOPAN VALOMERI (aloituslento v3f, omistaja 28.9.2026 klo 09.23 ja 09.29, sanatarkasti
    /// Raamattu-lokissa): "voisiko kartalla näkyä myös Auringon tekemä päivän ja yön raja, niin että Lento. Lähtisi yön puolelta ja
    /// tulisi sitten auringon puolelle Atenaan saavuttaessa. Kartalla saisi näkyä kaupunkien valomeri" ja "aloitusnäkymä pelissä
    /// Pitäisi olla valaistuna samalla lailla ... en halua lennon alkaessa tapahtuvan mitään hyppäystä kartalla".
    ///
    /// Pallon varjostin (Shaders/Cesium/Lahde~/tee_tileset.py, RadioHamara-syöte 26) tummentaa yöpuolen porvarillisen hämärän
    /// kaistalla (auringon korkeus pikselissä −6…+2°), kun _aurinko.w > 0, ja yövalot (RadioMastot.YovaloUrl, Black Marble)
    /// palavat painolla max(radion hämärä, yö). Tämä luokka kirjoittaa _aurinko = (auringon suunta maailmassa, voimakkuus) ja
    /// pitää yövalokerroksen rasteripaikassa (alfa 0, varjostin näytteistää paikan kuten RadioMastot), kun aloituskaupungin
    /// valinta tai aloituslento on käynnissä (<see cref="Pelikello.Valinnassa"/> tai <see cref="Pelikello.Lennossa"/>).
    /// Aika on pelikello: <see cref="MatkanPaiva"/> + Pelikello.AlkuKelloUtc + Pelikello.Tunnit. Perillä häivytys
    /// <see cref="HaivytysS"/>: pelin muu kartta pysyy ennallaan (web on malli).
    /// Komento `paivanvalo 0|1|auto|tila`: 1 = päällä myös muualla (kuvaparit), 0 = pois.
    /// </summary>
    [DefaultExecutionOrder(100)]
    public sealed class Paivanvalo : MonoBehaviour
    {
        /// <summary>Matkan lähtöpäivä (tarina: Heathrow, syyskuu 2026; auringon deklinaatio).</summary>
        public static readonly DateTime MatkanPaiva = new DateTime(2026, 9, 28, 0, 0, 0, DateTimeKind.Utc);
        /// <summary>Päälle ja pois (s).</summary>
        public const float HaivytysS = 1.2f;
        /// <summary>Yövalojen voimakkuus. Varjostin kertoo sen (0,5 + 0,5 × mastokorostus):lla ja korottaa potenssiin 2,2;
        /// ilman radiomaston lähikorostusta RadioMastojen 0,85 jäi laitteella himmeiksi pisteiksi (v3f-ajo 28.9. klo 14.30),
        /// joten valomerelle 2,0. Komento `paivanvalo voimakkuus x`.</summary>
        public const float OletusVoimakkuus = 2.0f;
        public static float Voimakkuus = OletusVoimakkuus;
        /// <summary>Kehittäjäkomento: true/false pakottaa, null = valinnan ja aloituslennon ajan.</summary>
        public static bool? Pakota;

        const string Kerros = "paivanvalo-yovalot";
        static readonly int AurinkoId = Shader.PropertyToID("_aurinko"), YovalotId = Shader.PropertyToID("_radioYovalot");

        public static Paivanvalo Instanssi { get; private set; }

        /// <summary>Pelikellon hetki UTC:nä.</summary>
        public static DateTime Utc => MatkanPaiva.AddHours(Pelikello.AlkuKelloUtc + Pelikello.Tunnit);

        /// <summary>Nykyinen voimakkuus 0–1 (komento ja loki).</summary>
        public float Paino => w;

        float w;
        bool paalla, yritetty, lisatty, lokattu;
        CesiumGeoreference georeferenssi;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Instanssi = null; Pakota = null; Voimakkuus = OletusVoimakkuus; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (Instanssi != null) return;
            var go = new GameObject("Paivanvalo");
            DontDestroyOnLoad(go);
            go.AddComponent<Paivanvalo>();
        }

        void Awake() => Instanssi = this;

        void OnDestroy()
        {
            Pois();
            if (Instanssi == this) Instanssi = null;
        }

        void LateUpdate()
        {
            // ALKULENTO v3 (omistaja 7.10. 14.5x: "Pelin alkulennosta voisi ottaa pois kokonaan sen yöosuuden, eli kartta näkyisi
            // koko maapallolla ... pelataan varman päälle ja otetaan se pois kokonaan"): ei automaattista yöpuolta valinnassa eikä
            // aloituslennolla, koko pallo päivässä; vain kehittäjäkomento `paivanvalo 1` näyttää rajan.
            bool haluttu = Pakota ?? false;
            w = Mathf.MoveTowards(w, haluttu ? 1f : 0f, Time.unscaledDeltaTime / HaivytysS);
            if (w <= 0f) { Pois(); return; }
            if (georeferenssi == null) georeferenssi = FindAnyObjectByType<CesiumGeoreference>();
            if (georeferenssi == null) return;
            if (!paalla)
            {
                paalla = true;
                Debug.Log($"MATKAKIRJA päivänvalo: päälle, kello {Pelikello.KelloTeksti} UTC {Utc:yyyy-MM-dd HH:mm}");
            }
            double3 kohti = Aurinko.AurinkoEcef(Utc);
            Vector3 suunta = georeferenssi.transform.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(kohti));
            float s = w * w * (3f - 2f * w);
            Shader.SetGlobalVector(AurinkoId, new Vector4(suunta.x, suunta.y, suunta.z, s));
            Yovalot(s);
        }

        /// <summary>Yövalokerros kuten RadioMastot.PaivitaYovalot: rasteri alfalla 0, paikka ja voimakkuus varjostimelle.</summary>
        void Yovalot(float s)
        {
            var kk = KarttaKerrokset.Instanssi;
            if (kk == null) return;
            if (!yritetty)
            {
                yritetty = true;
                if (!kk.RasteriPaikkaVapaana())
                {
                    Debug.LogWarning("MATKAKIRJA päivänvalo: ei vapaata rasteripaikkaa yövaloille (yöpuoli tummenee ilman valoja)");
                    return;
                }
                lisatty = kk.LisaaRasteri(Kerros, RadioMastot.YovaloUrl, CesiumUrlTemplateRasterOverlayProjection.WebMercator,
                    0, RadioMastot.YovaloMaxTaso, 1f, vaistyva: true) != null;
                if (!lisatty) Debug.LogWarning("MATKAKIRJA päivänvalo: yövalokerros ei mahtunut");
            }
            if (!lisatty) return;
            int paikka = kk.RasterinAlfa(Kerros, 0f);
            if (!lokattu) { lokattu = true; Debug.Log($"MATKAKIRJA päivänvalo: yövalot rasteripaikassa {paikka}"); }
            Shader.SetGlobalVector(YovalotId, paikka == 1 || paikka == 2
                ? new Vector4(paikka, Mathf.Max(0f, Voimakkuus) * s, RadioMastot.YovalotSuodatettu ? 1f : 0f, 0f)
                : Vector4.zero);
        }

        void Pois()
        {
            if (!paalla && !yritetty) return;
            // Globaali ensin: paikka voi seuraavaksi olla väritason tai linssin, jota ei saa lisätä emissiona.
            Shader.SetGlobalVector(AurinkoId, Vector4.zero);
            if (lisatty)
            {
                Shader.SetGlobalVector(YovalotId, Vector4.zero);
                KarttaKerrokset.Instanssi?.PoistaRasteri(Kerros);
            }
            if (paalla) Debug.Log("MATKAKIRJA päivänvalo: pois");
            paalla = yritetty = lisatty = lokattu = false;
            w = 0f;
        }

        /// <summary>Komento `paivanvalo tila`.</summary>
        public string Tila => $"päivänvalo {(Pakota.HasValue ? (Pakota.Value ? "pakotettu päälle" : "pakotettu pois") : "automaattinen")}, "
                              + $"paino {w:0.00}, kello {Pelikello.KelloTeksti} ({Utc:HH:mm} UTC), yövalot {(lisatty ? "paikassa" : "ei")}";
    }
}
