// ASTRONAUTIN KAMERAN 3D-KERROS (web js/linssit/satelliitti-avaruus.js,
// satelliitti-nimiot.js, astro-sumu.js). Toteuttaa IAstronautinNakyman pallon
// osat: tähdet, pilvikuori, 64 havaintopistettä nimineen, ISS ja sen rata.
// Käyttöliittymän osat (musta avausruutu, kuvanäkymä, avaruussumun harso)
// välitetään Natiivi-UI:lle staattisten koukkujen kautta.
//
// Pisteet ja nimet seuraavat Natiivisepän KaupunkiMerkit-mallia: juuri pallon
// pinnalla (+5 km), joka kehys käännetään kameraan ja skaalataan näytön
// pisteiksi, ja takapuolen merkit piilotetaan normaalilla.
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class AstronauttiKerros : MonoBehaviour, IAstronautinNakyma
    {
        // ── Natiivi-UI:n koukut ───────────────────────────────────────────
        /// <summary>Avausvaihe mustalle ruudulle ja otsikkokortille.</summary>
        public static Action<AvauksenVaihe> AvausKasittelija;
        /// <summary>Kuvanäkymä auki (kohde, havainnon indeksi) / kiinni (null, −1).</summary>
        public static Action<Havaintokohde, int> KuvaKasittelija;
        /// <summary>Avaruussumun harson peitto 0…1.</summary>
        public static Action<double> SumuKasittelija;
        /// <summary>ISS:n kyyti (tila, korkeus km, nopeus km/h, rata-arvio, simuloitu aika): Cupola-kehys, tietorivi, nopeutus,
        /// "Lennä kohteen ylle" ja ✕.</summary>
        public static Action<KyydinTila, double, double, bool, KyydinAika> KyytiKasittelija;

        const double MaanSade = 6_371_000, Nosto = 5000;
        const float Hehku = 28f, IssMerkki = 8f, Etuna = 0.02f;

        sealed class Piste
        {
            public Havaintokohde kohde;
            public Transform juuri;
            public TextMeshPro nimi;
            public Vector3 pinta, normaali;
            public Vector2 koko;
            public Kylki kylki = Kylki.Ala;
        }

        CesiumGeoreference georeferenssi;
        Camera kamera;
        PalloKierto kierto;
        TMP_FontAsset fontti;
        Material pisteMateriaali, issMateriaali, rataMateriaali;
        Mesh nelio;
        readonly List<Piste> pisteet = new List<Piste>();
        Tahtitaivas taivas;
        Pilvikuori pilvet;
        Avaruus avaruus;
        Yokuori yokuori;
        KyydinTaivas kyydinTaivas;
        Revontulet revontulet;
        CupolaKerros cupola;
        Transform iss;
        Transform issMalli;
        Material issMalliMateriaali;
        Mesh issMesh;
        KyydinTila kyyti = KyydinTila.Kauko;
        double issKorkeusM = Astronauttimatikka.IssKorkeus * MaanSade;
        /// <summary>ISS:n leveys ruudulla seurannassa (pt): liioiteltu pelikokoon kuten erikoismallit.</summary>
        const float IssMallinLeveysPt = 90f;
        GameObject rata;
        Mesh rataMesh;
        Vector3[] rataPaikat, rataSeuraavat, rataU;
        bool nimetNakyvissa;
        readonly Dictionary<string, Kylki> kyljet = new Dictionary<string, Kylki>();
        readonly List<NimionKohde> ladottavat = new List<NimionKohde>();
        float ladottu;

        /// <summary>Linssi, jolle napautukset välitetään.</summary>
        public AstronauttiLinssi Linssi;

        public static AstronauttiKerros Luo(PalloKierto kierto, string pilvienOsoite = null)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject("AstronauttiKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<AstronauttiKerros>();
            k.georeferenssi = g;
            k.kierto = kierto;
            k.kamera = kierto.GetComponent<Camera>();
            var merkit = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.merkit : null;
            k.fontti = merkit != null ? merkit.fontti : null;
            var varjostin = Resources.Load<Shader>("Varjostimet/Havaintopiste");
            k.pisteMateriaali = new Material(varjostin);
            k.issMateriaali = new Material(varjostin);
            k.issMateriaali.SetColor("_Vari", new Color32(0xf2, 0xf8, 0xff, 0xff));
            k.issMateriaali.SetColor("_Ydinvalo", Color.white);
            k.issMateriaali.SetFloat("_YtimenOsuus", 0.5f);
            var reitit = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.reitit : null;
            if (reitit != null && reitit.maa != null)
            {
                k.rataMateriaali = new Material(reitit.maa);
                k.rataMateriaali.SetColor("_BaseColor", new Color(16 / 255f, 26 / 255f, 44 / 255f, 0.62f));
                k.rataMateriaali.SetFloat("_Paksuus", 1.3f);
                k.rataMateriaali.SetVector("_Katko", new Vector4(1f, 1f, 0, 0));
            }
            k.nelio = Nelio();
            k.pilvienOsoite = pilvienOsoite;
            kierto.Napautettu += k.Napautus;
            return k;
        }

        string pilvienOsoite;

        // ── IAstronautinNakyma ────────────────────────────────────────────

        public void Avaus(AvauksenVaihe vaihe) => AvausKasittelija?.Invoke(vaihe);

        public void Kohteet(IReadOnlyList<Havaintokohde> kohteet)
        {
            using (LinssiOhjain.Merkki("satelliitti", LinssiOhjain.OsaTahdet).Auto())
                taivas ??= Tahtitaivas.Luo(georeferenssi, Matkakirja.Linssit.Tahdet.AstronautinKerroin, LinssiOhjain.Instanssi?.VahennettyLiike ?? false);
            using (LinssiOhjain.Merkki("satelliitti", LinssiOhjain.OsaPilvet).Auto())
                pilvet ??= Pilvikuori.Luo(georeferenssi, pilvienOsoite);
            // Tumma avaruus ja ilmakehän hehku (web AVARUUDEN_TAUSTA, ILMAKEHAN_VARI).
            avaruus ??= Avaruus.Luo(georeferenssi, georeferenssi.transform);
            // Yökuori vain kyydissä (Kyyti), kaukonäkymä kuten webissä.
            yokuori ??= Yokuori.Luo(georeferenssi);
            if (kohteetPyydetty) return;
            kohteetPyydetty = true;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            // Havaintopisteet ja nimet kehys kerrallaan (Kehysjono): 64 pisteen objektit veivät avauksesta
            // ~9 ms (ui piikit ajo 6); pisteet näkyvät vasta mustan avauksen jälkeen.
            foreach (var k in kohteet)
                nimijono.Lisaa(() => { var piste = LuoPiste(k, keskus); if (fontti != null) LuoNimi(piste); });
        }

        bool kohteetPyydetty;

        Piste LuoPiste(Havaintokohde k, double3 keskus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(k.Lon, k.Lat, Nosto));
            double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            var juuri = new GameObject("Havainto " + k.Tunnus).transform;
            juuri.SetParent(transform, false);
            var p = new GameObject("Piste").transform;
            p.SetParent(juuri, false);
            p.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
            var r = p.gameObject.AddComponent<MeshRenderer>();
            r.sharedMaterial = pisteMateriaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            p.localScale = new Vector3(Hehku, Hehku, 1);
            var piste = new Piste
            {
                kohde = k, juuri = juuri,
                pinta = (float3)u, normaali = (float3)math.normalize(u - keskus),
            };
            pisteet.Add(piste);
            return piste;
        }

        // NIMET KEHYS KERRALLAAN: 64 TextMeshPro-nimeä ja niiden mittaus samassa kehyksessä veivät iPadilla
        // avauksesta ~26 ms (ui piikit 24.9., TMP Parse Text ja fontin OpenType-taulut). Nimet näkyvät vasta
        // laskeutumisen jälkeen (nimet 0,25 × pallon korkeus), joten ne rakennetaan aikabudjetilla LateUpdatessa.
        readonly Kehysjono nimijono = new Kehysjono();

        void LuoNimi(Piste p)
        {
            var nimi = new GameObject("Nimi").AddComponent<TextMeshPro>();
            nimi.transform.SetParent(p.juuri, false);
            nimi.font = fontti;
            nimi.text = p.kohde.Nimi;
            nimi.fontSize = 12;
            nimi.color = new Color(0.92f, 0.97f, 0.94f);
            nimi.alignment = TextAlignmentOptions.Center;
            nimi.textWrappingMode = TextWrappingModes.NoWrap;
            nimi.outlineWidth = 0.25f;
            nimi.outlineColor = new Color32(8, 14, 22, 200);
            nimi.rectTransform.sizeDelta = new Vector2(400, 40);
            nimi.transform.localScale = Vector3.one * 10f;
            nimi.ForceMeshUpdate();
            p.koko = nimi.GetRenderedValues(false) * 10f;
            nimi.enabled = false;
            p.nimi = nimi;
        }

        public void Nimet(bool nakyvissa) => nimetNakyvissa = nakyvissa;

        public void Pilvet(double peitto, double kiertoAsteina)
        {
            // Kyydissä pilvet näkyvät aina (Siirtosepän löydös 28.9. cl5-kuvista): kaukonäkymän lähihäivytys (PilvienPeitto,
            // nolla alle 0,25 × avauskorkeuden) antoi ISS:n korkeudella peiton 0, joten päivän pilvet eivät näkyneet. Kyydissä
            // peitto on huippu 0,9 kuten webissä (web on malli); siirtymä 0,8 s.
            if (kyyti != KyydinTila.Kauko)
                peitto = PilvetKyydissa == "pois" ? 0 : Astronauttimatikka.PilvienPeittoHuippu;
            pilvienPeitto = Mathf.MoveTowards(pilvienPeitto, (float)peitto, Time.unscaledDeltaTime / 0.8f);
            // Päivän oikeat pilvet eivät ajelehdi maapallon ympäri (satunnaisen kuvan kierto vain kaukonäkymässä).
            pilvet?.Aseta(pilvienPeitto, paivanPilvet ? 0 : kiertoAsteina);
            yokuori?.PilvienPeitto(pilvienPeitto);
        }

        float pilvienPeitto;

        /// <summary>ISS-realismi 2: päivän pilvet (Julkaisijan ajastettu haku NASA GIBS:stä), haetaan kyydin alkaessa.</summary>
        public const string PaivanPilvetUrl = "https://media.matkakirja.app/data/pilvet/uusin.png";
        /// <summary>A/B (`astro kyyti paivanpilvet 0|1`): päivän pilvet pois (satunnainen Blue Marble -kuva).</summary>
        public static bool PaivanPilvetPois;
        bool paivanPilvet, paivanPilvetHaettu;

        /// <summary>
        /// Pilvet kyydissä (laitteen 1. Cupola-kierros 28.9.: 1,01 R:n eli ~64 km:n pilvikuoren reuna nousi ISS:ltä katsottuna maan
        /// reunan yläpuolelle ja vaalensi koko horisontin): "matala" = kuori ~8 km:iin kuin oikeat pilvet (oletus), "korkea" =
        /// kaukonäkymän 1,01 R, "pois" = ei pilviä (A/B: astro kyyti pilvet matala|korkea|pois).
        /// </summary>
        public static string PilvetKyydissa = "matala";
        const double PilvetMatalallaM = 8000;

        /// <summary>A/B-komento: pilvien korkeus heti (peitto päivittyy seuraavassa Pilvet-kutsussa).</summary>
        public void PaivitaPilvet() => AsetaPilvienKorkeus();

        void AsetaPilvienKorkeus()
        {
            if (pilvet == null) return;
            bool matala = kyyti != KyydinTila.Kauko && PilvetKyydissa == "matala";
            pilvet.Korkeus(matala ? PilvetMatalallaM : (Astronauttimatikka.PilvienSade - 1) * MaanSade);
        }

        public void Sumu(double peitto) => SumuKasittelija?.Invoke(peitto);

        public void Tahdet(double peitto) => tahtienPeitto = (float)peitto;

        float tahtienPeitto = 1f;

        public void Iss(LatLon paikka, IReadOnlyList<LatLon> kaari)
        {
            if (iss == null)
            {
                iss = new GameObject("ISS").transform;
                iss.SetParent(transform, false);
                var m = new GameObject("Merkki").transform;
                m.SetParent(iss, false);
                m.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                m.gameObject.AddComponent<MeshRenderer>().sharedMaterial = issMateriaali;
                m.localScale = new Vector3(IssMerkki * 2, IssMerkki * 2, 1);
            }
            // Todellinen korkeus (SGP4, noin 420 km): kyydin kamera katsoo samaa pistettä (IssKuvakulma.Seuranta).
            var utc = IssNyt.Kello();
            issKorkeusM = IssNyt.KorkeusKm(utc) * 1000;
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                new double3(paikka.Lon, paikka.Lat, issKorkeusM));
            issPinta = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            // Mallin asento: Z maajäljen suuntaan, Y ylös (ECEF-pinnan normaali).
            var ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
            double b = math.radians(IssNyt.Suuntima(utc));
            double3 pohjoinen = math.normalize(new double3(0, 0, 1) - ylos * ylos.z);
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double3 eteen = pohjoinen * math.cos(b) + ita * math.sin(b);
            issYlos = (float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(ylos);
            issEteen = (float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(eteen);
            // Rata päivittyy joka kehys (omistajan build 9 -löydös 33: sekunnin välein rakennettu rata
            // nykäisi). Kolmiot tehdään kerran, joka kehys vain kärkipisteet taulukoihin ilman allokointia.
            if (rataMateriaali != null) RakennaRata(kaari);
        }

        Vector3 issPinta, issYlos = Vector3.up, issEteen = Vector3.forward;

        public void Kyyti(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio, KyydinAika aika)
        {
            kyyti = tila;
            if (tila != KyydinTila.Kauko && issMalli == null) LuoIssMalli();
            // Ikkunassa ollaan aseman sisällä: havaintopisteet eivät kuulu Cupolan näkymään. Rata pois koko kyydin ajaksi: seurannassa
            // se kulkee kameran suuntaan ja näkyi pystyviivana ISS:n läpi (laiteajo 28.9.).
            if (rata != null) rata.SetActive(tila == KyydinTila.Kauko);
            if (yokuori != null) yokuori.Nayta(tila != KyydinTila.Kauko);
            // Kyydissä ohut ilmakehän kaari ja musta avaruus (omistajan palaute 28.9.), tähdet himmeinä (päivävalo).
            avaruus?.Kyyti(tila != KyydinTila.Kauko);
            AsetaPilvienKorkeus();
            if (tila != KyydinTila.Kauko && !paivanPilvetHaettu && !PaivanPilvetPois && pilvet != null)
            {
                paivanPilvetHaettu = true;
                pilvet.VaihdaKuva(PaivanPilvetUrl, ok =>
                {
                    paivanPilvet = ok;
                    if (ok) yokuori?.Pilvet(Pilvikuori.JaettuKuva);
                });
            }
            // Kyydissä oikeat tähdet ja Kuu (KyydinTaivas); satunnainen kenttä pois, kun oikeat ovat ladattu (muuten himmeänä 0,3).
            if (tila != KyydinTila.Kauko && kyydinTaivas == null) kyydinTaivas = KyydinTaivas.Luo(georeferenssi, kamera);
            kyydinTaivas?.Nayta(tila != KyydinTila.Kauko);
            if (tila != KyydinTila.Kauko && revontulet == null) revontulet = Revontulet.Luo(georeferenssi);
            revontulet?.Nayta(tila != KyydinTila.Kauko);
            tahtienPeitto = tila == KyydinTila.Kauko ? 1f
                : kyydinTaivas != null && kyydinTaivas.TahdetValmiit && !KyydinTaivas.Pois ? 0f : 0.3f;
            if (tila == KyydinTila.Ikkuna && cupola == null) cupola = CupolaKerros.Luo(kamera, georeferenssi);
            PaivitaKuukaudenPinta(tila != KyydinTila.Kauko);
            KyytiKasittelija?.Invoke(tila, korkeusKm, nopeusKmh, arvio, aika);
        }

        /// <summary>
        /// ISS-realismi 4a: kyydissä kuukauden oikea pinta (NASA Blue Marble Next Generation 2004 -kuukausisarja, PD; Karttasepän
        /// pyramidi julisteet/pallo/bmng/&lt;kk&gt;/ Z0–Z7, 256 px Web Mercator) reliefin päällä raster-paikassa 2: lumi, kasvillisuus
        /// ja aavikot kuten sinä kuukautena, ilman lisättyä rinnevarjostusta (kyydin aurinko valaisee pinnan). Kuukausi
        /// IssNyt.Kellosta (testikello mukana). Jos kuukauden Z0-laatta puuttuu ämpäristä (vientiä ei ole tehty), relief jää.
        /// A/B `astro kyyti kuukausi 0|1`.
        /// </summary>
        public const string KuukaudenPintaJuuri = "https://media.matkakirja.app/julisteet/pallo/bmng/";
        public const string KuukausiKerros = "astronautti-kuukausi";
        public const int KuukaudenPintaMaxTaso = 7;
        public static bool KuukaudenPintaPois;
        readonly Dictionary<int, bool> kuukausiAmparissa = new Dictionary<int, bool>();
        int kuukausiLisatty = -1, kuukausiKokeillaan = -1;

        /// <summary>Kutsutaan joka Kyyti-kutsulla (tietorivi sekunnin välein): kuukauden vaihtuessa kerros vaihtuu.</summary>
        void PaivitaKuukaudenPinta(bool kyydissa)
        {
            var kk = KarttaKerrokset.Instanssi;
            if (kk == null) return;
            int kuukausi = kyydissa && !KuukaudenPintaPois ? IssNyt.Kello().Month : -1;
            if (kuukausi > 0 && !kuukausiAmparissa.TryGetValue(kuukausi, out bool amparissa))
            {
                if (kuukausiKokeillaan < 0) StartCoroutine(KokeileKuukausi(kuukausi));
                return;
            }
            if (kuukausi > 0 && !kuukausiAmparissa[kuukausi]) kuukausi = -1;
            if (kuukausi == kuukausiLisatty) return;
            if (kuukausi < 0)
            {
                kk.PoistaRasteri(KuukausiKerros);
                kuukausiLisatty = -1;
                return;
            }
            kk.LisaaRasteri(KuukausiKerros, KuukaudenPintaJuuri + kuukausi.ToString("00") + "/{z}/{x}/{reverseY}.jpg",
                CesiumUrlTemplateRasterOverlayProjection.WebMercator, 0, KuukaudenPintaMaxTaso, 1f);
            kuukausiLisatty = kuukausi;
            Debug.Log($"MATKAKIRJA linssit: kyydin pinta: BMNG {kuukausi:00}");
        }

        System.Collections.IEnumerator KokeileKuukausi(int kuukausi)
        {
            kuukausiKokeillaan = kuukausi;
            using (var p = UnityWebRequest.Head(KuukaudenPintaJuuri + kuukausi.ToString("00") + "/0/0/0.jpg"))
            {
                p.timeout = 10;
                yield return p.SendWebRequest();
                kuukausiAmparissa[kuukausi] = p.result == UnityWebRequest.Result.Success && p.responseCode == 200;
            }
            kuukausiKokeillaan = -1;
            if (!kuukausiAmparissa[kuukausi])
                Debug.Log($"MATKAKIRJA linssit: kyydin pinta: BMNG {kuukausi:00} puuttuu ämpäristä, relief jää");
            PaivitaKuukaudenPinta(kyyti != KyydinTila.Kauko);
        }

        void LuoIssMalli()
        {
            var s = Resources.Load<Shader>("Varjostimet/Malli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA ISS-kyyti: Malli-varjostin puuttuu, ISS jää pisteeksi"); return; }
            issMesh = IssMalli.Rakenna();
            issMalliMateriaali = new Material(s) { name = "ISS" };
            issMalliMateriaali.SetFloat("_Ymparisto", 0.62f);
            issMalli = new GameObject("ISS-malli").transform;
            issMalli.SetParent(transform, false);
            issMalli.gameObject.AddComponent<MeshFilter>().sharedMesh = issMesh;
            var r = issMalli.gameObject.AddComponent<MeshRenderer>();
            r.sharedMaterial = issMalliMateriaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            issMalli.gameObject.SetActive(false);
        }

        public void Kuva(Havaintokohde kohde, int indeksi) => KuvaKasittelija?.Invoke(kohde, indeksi);

        public void KuvaPois() => KuvaKasittelija?.Invoke(null, -1);

        public void Pois()
        {
            if (cupola != null) Destroy(cupola.gameObject);
            KyytiKasittelija?.Invoke(KyydinTila.Kauko, 0, 0, false, default);
            AvausKasittelija?.Invoke(AvauksenVaihe.Pois);
            SumuKasittelija?.Invoke(0);
            Destroy(gameObject);
        }

        // ── Piirto ────────────────────────────────────────────────────────

        void RakennaRata(IReadOnlyList<LatLon> kaari)
        {
            int n = kaari.Count;
            if (n < 2) return;
            bool uusi = rataU == null || rataU.Length != n;
            if (uusi)
            {
                rataPaikat = new Vector3[n * 2];
                rataSeuraavat = new Vector3[n * 2];
                rataU = new Vector3[n];
            }
            for (int i = 0; i < n; i++)
            {
                var e = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(kaari[i].Lon, kaari[i].Lat, issKorkeusM));
                rataU[i] = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(e);
            }
            for (int i = 0; i < n; i++)
            {
                Vector3 seur = i < n - 1 ? rataU[i + 1] : rataU[i] + (rataU[i] - rataU[i - 1]);
                rataPaikat[i * 2] = rataPaikat[i * 2 + 1] = rataU[i];
                rataSeuraavat[i * 2] = rataSeuraavat[i * 2 + 1] = seur;
            }
            if (rata == null)
            {
                rata = new GameObject("ISS-rata");
                rata.transform.SetParent(transform, false);
                rataMesh = new Mesh { name = "ISS-rata" };
                rataMesh.MarkDynamic();
                rata.AddComponent<MeshFilter>().sharedMesh = rataMesh;
                rata.AddComponent<MeshRenderer>().sharedMaterial = rataMateriaali;
            }
            if (uusi)
            {
                var puolet = new Vector2[n * 2];
                for (int i = 0; i < n; i++) { puolet[i * 2] = new Vector2(-1, i); puolet[i * 2 + 1] = new Vector2(1, i); }
                var kolmiot = new int[(n - 1) * 6];
                for (int i = 0, t = 0; i < n - 1; i++)
                {
                    int a = i * 2;
                    kolmiot[t++] = a; kolmiot[t++] = a + 1; kolmiot[t++] = a + 2;
                    kolmiot[t++] = a + 1; kolmiot[t++] = a + 3; kolmiot[t++] = a + 2;
                }
                rataMesh.Clear();
                rataMesh.vertices = rataPaikat;
                rataMesh.SetUVs(0, rataSeuraavat);
                rataMesh.SetUVs(1, puolet);
                rataMesh.triangles = kolmiot;
            }
            else
            {
                rataMesh.vertices = rataPaikat;
                rataMesh.SetUVs(0, rataSeuraavat);
            }
            rataMesh.RecalculateBounds();
        }

        void LateUpdate()
        {
            if (kamera == null) return;
            nimijono.Aja();
            taivas?.Paivita(Time.unscaledDeltaTime, tahtienPeitto);
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float kerroin = LinssiOhjain.Pistekerroin;
            float pikseleita = Screen.height / kerroin;
            bool ladotaan = nimetNakyvissa && Time.unscaledTime - ladottu >= (float)(Astronauttimatikka.LadonnanValiMs / 1000);
            if (ladotaan) { ladottu = Time.unscaledTime; ladottavat.Clear(); }

            foreach (var p in pisteet)
            {
                Vector3 paikka = gt.TransformPoint(p.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                // Ikkunassa ja kohteen yllä silmä on asemassa: havaintopisteet eivät kuulu näkymään (webissä piilossa koko kyydin ajan).
                bool edessa = kyyti != KyydinTila.Ikkuna && kyyti != KyydinTila.Kohde
                    && Vector3.Dot(gt.TransformDirection(p.normaali), kohti / etaisyys) > 0.05f;
                if (p.juuri.gameObject.activeSelf != edessa) p.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;
                float lahella = etaisyys * (1f - Etuna);
                p.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                p.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pikseleita);
                if (ladotaan && p.nimi != null)
                {
                    Vector3 r = kamera.WorldToScreenPoint(paikka);
                    // Ladonta ruutupisteinä, y alaspäin kuten webissä.
                    ladottavat.Add(new NimionKohde(p.kohde.Tunnus, r.x / kerroin, (Screen.height - r.y) / kerroin, p.koko.x, p.koko.y));
                }
            }

            if (ladotaan)
            {
                var tulos = Astronauttimatikka.LadoNimiot(ladottavat, kyljet);
                kyljet.Clear();
                foreach (var kv in tulos) kyljet[kv.Key] = kv.Value;
            }
            foreach (var p in pisteet)
            {
                if (p.nimi == null) continue;
                var kylki = nimetNakyvissa && p.juuri.gameObject.activeSelf && kyljet.TryGetValue(p.kohde.Tunnus, out var k) ? k : Kylki.Piilo;
                bool nakyy = kylki != Kylki.Piilo;
                if (p.nimi.enabled != nakyy) p.nimi.enabled = nakyy;
                if (!nakyy) continue;
                var l = Astronauttimatikka.NimionLaatikko(new NimionKohde(p.kohde.Tunnus, 0, 0, p.koko.x, p.koko.y), kylki);
                // Laatikon keskipiste pisteen suhteen; y ylös juuren sisällä.
                p.nimi.transform.localPosition = new Vector3((float)(l.X + l.W / 2), (float)-(l.Y + l.H / 2), 0);
            }

            if (cupola != null)
            {
                cupola.IssYlos = issYlos;
                cupola.IssKorkeusKm = issKorkeusM / 1000;
                cupola.Nayta(kyyti == KyydinTila.Ikkuna && !IssKyytiNakyma.IlmanKehysta && IssKyytiNakyma.KolmiulotteinenKehys);
            }
            if (iss != null)
            {
                Vector3 paikka = gt.TransformPoint(issPinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                // Kyydissä (seuranta tai siirtymä sinne) ISS on 3D-malli, ikkunassa ei kumpikaan (ollaan sisällä).
                bool malli = kyyti == KyydinTila.Seuranta && issMalli != null;
                bool piste = kyyti == KyydinTila.Kauko || (kyyti == KyydinTila.Seuranta && issMalli == null);
                if (iss.gameObject.activeSelf != piste) iss.gameObject.SetActive(piste);
                if (piste)
                {
                    iss.SetPositionAndRotation(paikka, kt.rotation);
                    iss.localScale = Vector3.one * (2f * etaisyys * tanPuoli / pikseleita);
                }
                if (issMalli != null)
                {
                    if (issMalli.gameObject.activeSelf != malli) issMalli.gameObject.SetActive(malli);
                    if (malli)
                    {
                        issMalli.SetPositionAndRotation(paikka, Quaternion.LookRotation(gt.TransformDirection(issEteen), gt.TransformDirection(issYlos)));
                        // Liioittelu: mallin leveys IssMallinLeveysPt ruudun pisteinä tällä etäisyydellä.
                        float pt = 2f * etaisyys * tanPuoli / pikseleita;
                        issMalli.localScale = Vector3.one * (IssMallinLeveysPt * pt / IssMalli.Leveys);
                    }
                }
            }
        }

        /// <summary>Lähin näkyvä havaintopiste 44 pt:n säteellä (web lahinLinssimerkki).</summary>
        void Napautus(Vector2 ruutu)
        {
            if (Linssi == null || kamera == null) return;
            if (Linssi.Kyydissa) { Linssi.NapautaIss(); return; }
            float kerroin = LinssiOhjain.Pistekerroin;
            Piste paras = null;
            float parasEtaisyys = (float)Astronauttimatikka.OsumaSadePx * kerroin;
            // ISS:n kyyti (suositus 28.9.): ISS-pisteen napautus 44 pt:n säteellä vie kyytiin, jos se on lähempänä kuin
            // yksikään havaintopiste.
            bool issLahin = false;
            if (iss != null && iss.gameObject.activeSelf)
            {
                Vector3 si = kamera.WorldToScreenPoint(georeferenssi.transform.TransformPoint(issPinta));
                float di = Vector2.Distance(ruutu, si);
                if (si.z > 0 && di < parasEtaisyys) { parasEtaisyys = di; issLahin = true; }
            }
            foreach (var p in pisteet)
            {
                if (!p.juuri.gameObject.activeSelf) continue;
                Vector3 s = kamera.WorldToScreenPoint(georeferenssi.transform.TransformPoint(p.pinta));
                float d = Vector2.Distance(ruutu, s);
                if (d < parasEtaisyys) { parasEtaisyys = d; paras = p; }
            }
            if (paras != null) Linssi.Napauta(paras.kohde.Tunnus);
            else if (issLahin) Linssi.NapautaIss();
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Havaintopiste" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.RecalculateBounds();
            return m;
        }

        void OnDestroy()
        {
            if (kuukausiLisatty >= 0) KarttaKerrokset.Instanssi?.PoistaRasteri(KuukausiKerros);
            if (kierto != null) kierto.Napautettu -= Napautus;
            if (taivas != null) Destroy(taivas.gameObject);
            if (pilvet != null) Destroy(pilvet.gameObject);
            if (avaruus != null) Destroy(avaruus.gameObject);
            if (yokuori != null) Destroy(yokuori.gameObject);
            if (kyydinTaivas != null) Destroy(kyydinTaivas.gameObject);
            if (revontulet != null) Destroy(revontulet.gameObject);
            if (cupola != null) Destroy(cupola.gameObject);
            if (rataMesh != null) Destroy(rataMesh);
            Destroy(nelio);
            Destroy(pisteMateriaali);
            Destroy(issMateriaali);
            if (issMalliMateriaali != null) Destroy(issMalliMateriaali);
            if (issMesh != null) Destroy(issMesh);
            if (rataMateriaali != null) Destroy(rataMateriaali);
        }
    }
}
