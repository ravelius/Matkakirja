using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLIEN REKISTERÖINTI JA LIIKKUVAT OSAT (Mallinsepän rajapinta, proto-3d/lokit/mallinseppa-rajapinta.md;
    /// Fablen tilaus ja omistajan hyväksyntä 26.9.2026 klo 22.0x).
    ///
    /// REKISTERÖINTI: yksi tiedosto mallia kohden (Erikoismallit/&lt;Avain&gt;.cs, partial class Symbolimallit) ja siinä yksi
    /// staattinen kenttä, jonka alustus rekisteröi mallin tyypin staattisessa alustuksessa (ei muiden tiedostojen muokkausta,
    /// ei heijastusta, IL2CPP-turvallinen):
    /// <code>
    /// static readonly bool montSaintMichel = Rekisteroi("mont-saint-michel",
    ///     new Erikoismalli { Runko = MontSaintMichelRunko, Osat = MontSaintMichelOsat });
    /// </code>
    /// Avain = noston tunnisteen loppuosa (kohde:&lt;avain&gt; tai kohde:hahmotelma-&lt;avain&gt;). Sama avain kahdesti = virhe lokiin,
    /// ensimmäinen pysyy.
    ///
    /// LIIKKUVAT OSAT (Tivolin logiikka): malli kuvaa osat (<see cref="LiikkuvaOsaMaaritys"/>), Symbolimallit luo ne mallin
    /// lapsiksi Elava-layerille ja julkaisee listan <see cref="LiikkuvatOsat"/>; Linssiseppä ajaa liikkeen (Vaihtelu,
    /// ElavaKerros.Animoi). Osan lepoasento: localPosition = Pivot, localRotation = identiteetti, localScale = 1 (mallin koko
    /// periytyy juuresta). Animoija asettaa Osa.localRotation / localPosition suhteessa lepoasentoon eikä koske mallin juureen.
    /// <see cref="LiikkuvatVersio"/> kasvaa, kun osia syntyy tai katoaa (lista muuttuu); Nakyy ja Jalka päivittyvät
    /// joka kehys ilman allokaatiota.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Liikkuvan osan liike (Linssisepän animoija tulkitsee).</summary>
        public enum Liike { Kierto, Keinunta, Valahdys, Nousu, Aalto, Liuku }

        /// <summary>Liikkuvan osan kuvaus (mallitiedostossa): verkko, paikka mallin avaruudessa ja liikkeen parametrit.</summary>
        public struct LiikkuvaOsaMaaritys
        {
            /// <summary>"siivet", "savu", "lippu" …</summary>
            public string Nimi;
            /// <summary>Osan oma verkko paikallisessa avaruudessa, pivot origossa (Rakentaja → Verkko).</summary>
            public Func<Mesh> Verkko;
            /// <summary>Osan paikka mallin avaruudessa (+Y ylös, +Z pohjoinen, leveys ~1).</summary>
            public Vector3 Pivot;
            public Liike Liike;
            /// <summary>Kierto- tai keinunta-akseli (tai liu'un suunta) osan paikallisessa avaruudessa.</summary>
            public Vector3 Akseli;
            /// <summary>Kierrosta/s tai jaksoa/s.</summary>
            public float Nopeus;
            /// <summary>Keinunnan asteet tai liu'un/nousun matka mallin avaruudessa.</summary>
            public float Laajuus;
            /// <summary>Vaihtelun käynnin ja tauon keskiarvot (s); siemen noston id:stä.</summary>
            public float KayS, TaukoS;
        }

        /// <summary>Erikoismallin rekisteröinti: runko (LOD0), liikkuvat osat (voi olla null) ja LOD1 (valinnainen).</summary>
        public sealed class Erikoismalli
        {
            public Func<Mesh> Runko;
            public Func<LiikkuvaOsaMaaritys[]> Osat;
            /// <summary>Valinnainen; taso 1 piirtää toistaiseksi LOD0:n (kynnys 2,5, koko enintään 40 pt).</summary>
            public Func<Mesh> Lod1;
            /// <summary>Valinnainen kolmioarvio (tarkistukseen; oikea luku `symbolit tila` -rivillä).</summary>
            public int Kolmiot0;
        }

        /// <summary>Yksi näkyvä liikkuva osa kartalla (Linssisepän animoijalle).</summary>
        public sealed class LiikkuvaOsa
        {
            /// <summary>Noston id (Vaihtelun siemen).</summary>
            public string Id { get; internal set; }
            /// <summary>Erikoismallin avain, esim. "mont-saint-michel".</summary>
            public string Avain { get; internal set; }
            public LiikkuvaOsaMaaritys Maaritys { get; internal set; }
            /// <summary>Osan Transform (mallin lapsi, Elava-layer); lepoasento localPosition = Maaritys.Pivot.</summary>
            public Transform Osa { get; internal set; }
            /// <summary>Mallin juuri maailmassa (maan pinnalla): lähimmät ruudun keskeltä tämän mukaan.</summary>
            public Vector3 Jalka { get; internal set; }
            /// <summary>Malli näkyy (kynnys, kallistus, pallon etupuoli, ei lentoa/linssiä/porttia).</summary>
            public bool Nakyy { get; internal set; }
            internal MeshRenderer renderoija;
        }

        static Dictionary<string, Erikoismalli> mallit;
        /// <summary>Rekisteröidyt erikoismallit avaimella (luodaan ensimmäisessä rekisteröinnissä: kenttien alustusjärjestys
        /// partial-tiedostojen välillä ei ole määrätty).</summary>
        static Dictionary<string, Erikoismalli> Mallit => mallit ??= new Dictionary<string, Erikoismalli>(StringComparer.Ordinal);

        /// <summary>Rekisteröi erikoismallin avaimella (kutsutaan staattisen kentän alustuksessa, ks. luokan kuvaus).</summary>
        static bool Rekisteroi(string avain, Erikoismalli malli)
        {
            if (string.IsNullOrEmpty(avain) || malli == null || malli.Runko == null)
            {
                Debug.LogError($"MATKAKIRJA symbolimallit: virheellinen erikoismalli '{avain}'");
                return false;
            }
            if (Mallit.ContainsKey(avain))
            {
                Debug.LogError($"MATKAKIRJA symbolimallit: erikoismalli '{avain}' rekisteröity kahdesti");
                return false;
            }
            Mallit[avain] = malli;
            return true;
        }

        // Kreikan erikoismallit (Symbolimallit.cs) samalla kaavalla.
        static readonly bool akropolis = Rekisteroi("akropolis", new Erikoismalli { Runko = Akropolis });
        static readonly bool delfoi = Rekisteroi("delfoi", new Erikoismalli { Runko = Delfoi });
        static readonly bool meteora = Rekisteroi("meteora", new Erikoismalli { Runko = Meteora });

        static readonly List<LiikkuvaOsa> liikkuvat = new List<LiikkuvaOsa>();
        /// <summary>Kartalle luodut liikkuvat osat (kaikki, myös piilossa olevat: katso Nakyy).</summary>
        public static IReadOnlyList<LiikkuvaOsa> LiikkuvatOsat => liikkuvat;
        /// <summary>Kasvaa, kun <see cref="LiikkuvatOsat"/> muuttuu (osia syntyy tai katoaa).</summary>
        public static int LiikkuvatVersio { get; private set; }

        /// <summary>Liikkuvien osien verkot avaimella ja osan nimellä (jaettu nostojen kesken kuten rungot).</summary>
        static readonly Dictionary<string, Mesh> osaVerkot = new Dictionary<string, Mesh>(StringComparer.Ordinal);
        /// <summary>Noston liikkuvat osat (tyhjä taulukko, jos mallissa ei ole osia).</summary>
        readonly Dictionary<string, LiikkuvaOsa[]> osatNostolla = new Dictionary<string, LiikkuvaOsa[]>(StringComparer.Ordinal);
        static readonly LiikkuvaOsa[] eiOsia = new LiikkuvaOsa[0];

        static void NollaaLiikkuvat()
        {
            liikkuvat.Clear(); osaVerkot.Clear(); LiikkuvatVersio++;
        }

        /// <summary>Luo mallin liikkuvat osat mallin lapsiksi (kerran noston id:llä).</summary>
        LiikkuvaOsa[] LuoOsat(string id, string avain, Transform juuri)
        {
            if (osatNostolla.TryGetValue(id, out var olemassa)) return olemassa;
            var maaritykset = avain != null && Mallit.TryGetValue(avain, out var m) && m.Osat != null ? m.Osat() : null;
            if (maaritykset == null || maaritykset.Length == 0) { osatNostolla[id] = eiOsia; return eiOsia; }
            var osat = new LiikkuvaOsa[maaritykset.Length];
            int layer = ElavaKerros.Taso;
            for (int i = 0; i < maaritykset.Length; i++)
            {
                var d = maaritykset[i];
                string vk = avain + "/" + d.Nimi;
                if (!osaVerkot.TryGetValue(vk, out var verkko)) osaVerkot[vk] = verkko = d.Verkko != null ? d.Verkko() : null;
                var go = new GameObject("Osa-" + d.Nimi);
                if (layer >= 0) go.layer = layer;
                go.transform.SetParent(juuri, false);
                go.transform.localPosition = d.Pivot;
                go.AddComponent<MeshFilter>().sharedMesh = verkko;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                r.enabled = false;
                osat[i] = new LiikkuvaOsa { Id = id, Avain = avain, Maaritys = d, Osa = go.transform, renderoija = r };
                liikkuvat.Add(osat[i]);
            }
            osatNostolla[id] = osat;
            LiikkuvatVersio++;
            return osat;
        }

        /// <summary>Osien näkyvyys ja jalka mallin mukaan (ei allokaatioita).</summary>
        static void PaivitaOsat(LiikkuvaOsa[] osat, bool nakyy, Vector3 jalka)
        {
            for (int i = 0; i < osat.Length; i++)
            {
                var o = osat[i];
                if (o.Nakyy != nakyy) { o.Nakyy = nakyy; o.renderoija.enabled = nakyy; }
                if (nakyy) o.Jalka = jalka;
            }
        }

        /// <summary>Himmeys (löytämätön) myös osille samalla lohkolla kuin rungolle.</summary>
        static void HimmennaOsat(LiikkuvaOsa[] osat, MaterialPropertyBlock lohko)
        {
            for (int i = 0; i < osat.Length; i++) osat[i].renderoija.SetPropertyBlock(lohko);
        }

        void OnDestroy()
        {
            // Kappaleet ovat tämän lapsia ja tuhoutuvat mukana: lista tyhjäksi, ettei animoija viittaa tuhottuihin.
            if (liikkuvat.Count > 0) { liikkuvat.Clear(); LiikkuvatVersio++; }
        }
    }
}
