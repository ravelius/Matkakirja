// DIORAAMAN 3D-PIENOISFIGUURIT (Poikkileikkaus-linssi, Linnanrakentaja erä 2b, ali-agentti P4b, 29.9.2026).
// Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT". RINNAKKAINEN DioraamaHahmot.
// cs:lle (2D-paikkamerkkihahmot) — EI laajenna sitä. DioraamaSovitin päättää per henkilö, kumpi omistaa hahmon
// ("poikki hahmot 2d|3d", oletus 3d: 3D-malli korvaa kortin; kortti jää varalle henkilölle, jolla ei ole
// malli3d.glb:tä lähteessä) — tämä tiedosto ei itse suodata mitään pois DioraamaHahmot.cs:n puolelta.
//
// GLB-LATAUS: yksi glb per HENKILÖ (henkilo.Malli3d.NatiiviGlb: malli3d.skin.glb tai nivelhahmon glb), EI per hahmo-instanssi — monta hahmoa (esim.
// kaksi eri huoneen kokkia) voi jakaa saman henkilön mallin. Mesh/Material rakennetaan KERRAN per glb-polku
// (AsetaGlb) ja jaetaan KAIKKIEN sen henkilön instanssien kesken; vain Transform-hierarkia (nivelten paikat/
// kierrot) on per-instanssi. Sama LataaTila/avauskerta-malli kuin DioraamaSovitin.cs:n muu lataus.
//
// NIVELTEN KIERTO: Rakennus.Liikkeet[silmukka] (rakennus.json:n "liikkeet"-kenttä) + Ydin/Dioraama/Liikkeet.cs
// (NivelKulmat/JuuriNousu, JS-pariteetti kultaisilla vektoreilla). EULER-JÄRJESTYS (selvitetty TÄSSÄ erässä —
// tools/dioraama/esikatselu-hahmot.mjs:n kommentti jätti tämän auki: "natiivin C#-vastine ei ollut vielä
// olemassa... jos [järjestys] poikkeaa, tämä on ensimmäinen paikka katsoa"): JS/THREE soveltaa solmu.rotation.
// set(rx,ry,rz):n THREEn OLETUSJÄRJESTYKSELLÄ 'XYZ' = matriisi M = Rx(rx)·Ry(ry)·Rz(rz) (Rz sovelletaan
// pisteeseen ENSIN; korjattu katselmoinnissa 29.9.). Unityyn (kohdan 0 z-peilaus R = diag(1,1,-1), sama kuin
// DioraamaGlb.cs:n rotation-kommentti) tarvitaan Q = R·M·R; konjugaatio pitää järjestyksen ja kääntää x- ja
// y-kulmien etumerkin (Rz säilyy): Q = Rx(-rx)·Ry(-ry)·Rz(rz) — ks. NivelKierto()-metodi alla.
// EI VISUAALISESTI VARMISTETTU (ei simulaattoria sallittu tässä erässä) — jos raaja kiertyy väärään suuntaan
// (esim. tyo-silmukan olka_o, jolla rx JA rz ovat molemmat nollasta poikkeavia yhtä aikaa), TARKISTA TÄMÄ.
//
// KASVOT KULKUSUUNTAAN / SUUNTA: EI raakaa kulma-aritmetiikkaa — sama menetelmä kuin DioraamaNayttamo.Paivita
// (kameran LookRotation) ja DioraamaHahmot.Paivita (billboard camera-facing): lasketaan suuntaVEKTORI
// kanonisessa tilassa, peilataan se DioraamaNayttamo.UnityPiste-funktiolla (JO todennettu/testattu muualla),
// ja käytetään Quaternion.LookRotationia. Tämä välttää KOKONAAN erillisen kulma-etumerkkikeskustelun.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    // Alias nimiavaruuden SISÄLLÄ (ks. DioraamaNayttamo.cs:n vastaava kommentti): V3 tarkoittaisi muuten
    // vahingossa Matkakirja.NimiLadonta.cs:n omaa V3:a.
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed partial class DioraamaHahmot3D
    {
        /// <summary>"poikki hahmot 2d|3d" (DioraamaSovitin.Komento): oletus 3d (tosi). Vaikuttaa SEURAAVIIN
        /// LisaaTila-kutsuihin ("poikki lataa" lataa tilat uudelleen) — sama sopimus kuin DioraamaLiekit.
        /// Kolmiulotteinen (era 2b, kohta 6): kytkin ei ole tilaton, se muuttaa vain tulevaa latausta.</summary>
        public static bool Paalla = true;

        static readonly int IdVari = Shader.PropertyToID("_Vari"), IdTila = Shader.PropertyToID("_Tila"),
            IdKuvioTyyppi = Shader.PropertyToID("_KuvioTyyppi"), IdPohjaKuva = Shader.PropertyToID("_PohjaKuva");
        static Shader varjostin;
        static Shader Varjostin() => varjostin ??= Resources.Load<Shader>("Varjostimet/DioraamaValaistu");
        static readonly double[] Lepo = { 0, 0, 0 };
        const double RAD = Math.PI / 180;

        /// <summary>Yhden solmun (nivelen) jaettu geometria — rakennetaan kerran per henkilön glb, jaetaan
        /// kaikkien sen henkilön hahmo-instanssien kesken. Null, jos solmulla ei ole meshiä (puhdas nivel).</summary>
        sealed class SolmuMalli { public Mesh Mesh; public Material[] Materiaalit; }

        /// <summary>Yhden henkilön (glb-polun) jaettu malli: solmuhierarkia + per-solmu SolmuMalli (rinnakkainen
        /// Glb.Solmut-listan kanssa).</summary>
        sealed class HenkiloMalli
        {
            public GlbMalli Glb; public SolmuMalli[] Solmut;
            /// <summary>SKIN: skinnattujen solmujen meshit (null muille); jaettu kaikkien instanssien kesken.</summary>
            public SolmuMalli[] SkinSolmut;
            public bool Skin;
            public List<Texture2D> Tekstuurit = new List<Texture2D>();
        }

        /// <summary>Yksi hahmo-instanssi näyttämöllä. Juuri/SolmuT ovat null, kunnes henkilön glb on latautunut
        /// (AsetaGlb) — siihen asti hahmo on täysin näkymätön (2D-kortti on varalla tälle ajalle, ks. tiedoston
        /// yläkommentti — POIKKEAMA: toisin kuin 2D-atlas, jolla on harmaa paikkamerkki latauksen ajaksi, 3D:llä
        /// ei ole yleistä paikkamerkkigeometriaa; lyhyt latausviive näkyy hahmon puuttumisena, ei harmaana).</summary>
        sealed class Esiintyma
        {
            /// <summary>FACEIT: blend shape -kasvot (renderer, Visemit.Nimet-indeksit, silmien räpäytys); null = ei muotoja.</summary>
            public List<(SkinnedMeshRenderer R, int[] Suu, int Vasen, int Oikea)> Kasvot;
            public float SuuTaso;
            public string TilaId, HahmoId;
            public Hahmo Hahmo;
            public Henkilo Henkilo;
            public GameObject Juuri;
            public Transform[] SolmuT;
            public HenkiloMalli Malli;
            public bool Nakyvissa;
            // Reitti (SAMA logiikka kuin DioraamaHahmot.cs:n Esiintyma, ks. ValmisteleReitti/ReittiPaikkaJaSuunta).
            public double[] Kumulatiivinen;
            public double ReitinVaihe, ReitinMatka, ReitinKulkuS;
            // SKIN: oma sekoitin (leike, häivytys, aikakerroin) ja edellinen aika dt:tä varten.
            public DioraamaSekoitin Sekoitin;
            public double EdellinenT = double.NaN;
            // Katse puhujaan (omistaja 5.10. klo 14.3x): pehmennetty kääntö oman suunnan ympärillä.
            public float KatseKulma;
            public int PaaIndeksi = -2;
            public Quaternion PaaKierto = Quaternion.identity;
            public RootMotion.FinalIK.FullBodyBipedIK Ik; // Final IK (DioraamaHahmot3D.IK.cs): luodaan ensimmäisellä kohdistuksella
            public bool IkYritetty; public float JalkaMittausT;
            public string Silmukka; public float KasiPainoR, KasiPainoL; // kädet esineisiin (kadet[].milloin)
            public string EleNimi; public double EleAlku; // kertaeleen (ele_<ele>) vuoro ja alkuhetki
            // Eleet puheen tahdissa (7.10.): ajoitettu kertaele, kuulijan nyökkäys, puhujan katseen kohde, vakaa siemen.
            public string AjoitettuEle; public double AjoitettuAlku = double.NegativeInfinity; public int EleLaskuri;
            public double NyokkaysAlku = double.NegativeInfinity; public int NyokkaysLaskuri; public string KuulijaEle;
            public string KatseKohde;
            public int Siemen = int.MinValue;
            // Irrallinen hahmo (historiamoottori V2c: soutaja veneessä): vanhempi, leike ja ulkoinen kello; ei tilan paikkaa eikä eleitä.
            public Transform Isa; public Func<(string Leike, double Aika)> IrrallinenTila; public GlbAnimaatio IrrallinenEdellinen; public Quaternion IrrallinenKierto = Quaternion.identity;
            /// <summary>Jalat maahan Final IK Grounderilla (seikkailun kävelevät hahmot; omistaja 8.10.).</summary>
            public bool IrrallinenJalat;
        }

        /// <summary>Irrallinen hahmo (V2c): henkilön glb, vanhempana isa (esim. veneen istuin_soutaja, ilman omaa siirtoa tai kiertoa),
        /// leike soi kellon ajasta (soutu.json: veneen ja soutajan leikkeet samasta kellosta). Glb latautuu IrrallistenGlb-listan kautta.</summary>
        public void LisaaIrrallinen(Rakennus rakennus, string henkiloId, Transform isa, Func<(string Leike, double Aika)> tila, Quaternion? kierto = null, bool jalat = false)
        {
            if (rakennus?.Henkilot == null || !rakennus.Henkilot.TryGetValue(henkiloId, out var henkilo) || string.IsNullOrEmpty(henkilo.Malli3d?.NatiiviGlb)) return;
            var e = new Esiintyma { TilaId = "irrallinen", HahmoId = henkiloId, Hahmo = new Hahmo { Id = henkiloId, HenkiloId = henkiloId }, Henkilo = henkilo,
                Isa = isa, IrrallinenTila = tila, IrrallinenKierto = kierto ?? Quaternion.identity, IrrallinenJalat = jalat };
            esiintymat.Add(e);
            if (malliCache.TryGetValue(henkilo.Malli3d.NatiiviGlb, out var malli)) Rakenna(e, malli);
        }

        /// <summary>Irrallisen hahmon solmu nimellä (kädet: kahva_oikea, Kontaktivarjo), kun malli on rakennettu; muuten null.</summary>
        public Transform IrrallisenSolmu(string henkiloId, string nimi)
        {
            foreach (var e in esiintymat)
                if (e.Isa != null && e.HahmoId == henkiloId && e.Juuri != null)
                    foreach (var t in e.Juuri.GetComponentsInChildren<Transform>(true)) if (t.name == nimi) return t;
            return null;
        }

        /// <summary>Irrallisten hahmojen glb:t, joita ei ole vielä ladattu.</summary>
        public void IrrallistenGlb(List<string> ulos)
        {
            foreach (var e in esiintymat)
            {
                if (e.Isa == null) continue;
                string glb = e.Henkilo.Malli3d?.NatiiviGlb;
                if (!string.IsNullOrEmpty(glb) && !malliCache.ContainsKey(glb) && !ulos.Contains(glb)) ulos.Add(glb);
            }
        }

        /// <summary>Historiamoottori: tilat, joiden kohtaushahmot piilotetaan (E3: kappelin kappalainen ja vouti korvataan pelin hahmoilla).</summary>
        public static readonly HashSet<string> PiilotetutTilat = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Historiamoottori: henkilöt, joiden kohtaushahmot piilotetaan kaikista tiloista (partioiva kokki, portinvartija, vartijat).</summary>
        public static readonly HashSet<string> PiilotetutHenkilot = new HashSet<string>(StringComparer.Ordinal);

        public void PoistaIrralliset(string henkiloId = null)
        {
            for (int i = esiintymat.Count - 1; i >= 0; i--)
                if (esiintymat[i].TilaId == "irrallinen" && (henkiloId == null || esiintymat[i].HahmoId == henkiloId))
                {
                    if (esiintymat[i].Juuri != null) UnityEngine.Object.Destroy(esiintymat[i].Juuri);
                    esiintymat.RemoveAt(i);
                }
        }

        void PaivitaIrrallinen(Esiintyma e)
        {
            if (e.Isa == null) { if (e.Juuri.activeSelf) e.Juuri.SetActive(false); return; }
            if (e.Juuri.transform.parent != e.Isa) { e.Juuri.transform.SetParent(e.Isa, false); e.Juuri.transform.localPosition = Vector3.zero; e.Juuri.transform.localRotation = e.IrrallinenKierto; }
            if (!e.Juuri.activeSelf) e.Juuri.SetActive(true);
            e.Nakyvissa = true;
            var (leike, aika) = e.IrrallinenTila?.Invoke() ?? ("idle", 0.0);
            // Leike glb:n nimellä (ele_soutu) tai silmukan nimellä skin.leikkeet-taulun kautta (vartija: idle, kavely); aika kiertää.
            var anim = e.Malli.Glb.Animaatio(leike) ?? e.Malli.Glb.Animaatio(Leike(e.Henkilo.Malli3d?.Skin, leike)) ?? e.Malli.Glb.Animaatio("idle");
            var sk = e.Sekoitin;
            if (anim == null || sk == null) return;
            if (anim != e.IrrallinenEdellinen && e.IrrallinenEdellinen != null)
                foreach (var k in e.IrrallinenEdellinen.Kanavat) { int i = k.Solmu; var g = e.Malli.Glb.Solmut[i];
                    Array.Copy(g.Translation, 0, sk.T, i * 3, 3); Array.Copy(g.Rotation, 0, sk.R, i * 4, 4); Array.Copy(g.Scale, 0, sk.S, i * 3, 3); }
            e.IrrallinenEdellinen = anim;
            if (e.IrrallinenJalat) IkPalauta(e);
            DioraamaSekoitin.Nayte(anim, anim.Kesto > 0 ? (float)(aika % anim.Kesto) : 0f, sk.T, sk.R, sk.S);
            foreach (var k in anim.Kanavat)
            {
                int i = k.Solmu; if (i < 0 || i >= e.SolmuT.Length) continue;
                var tr = e.SolmuT[i];
                if (k.Polku == 0) tr.localPosition = new Vector3(sk.T[i * 3], sk.T[i * 3 + 1], sk.T[i * 3 + 2]);
                else if (k.Polku == 1) tr.localRotation = new Quaternion(sk.R[i * 4], sk.R[i * 4 + 1], sk.R[i * 4 + 2], sk.R[i * 4 + 3]);
                else tr.localScale = new Vector3(sk.S[i * 3], sk.S[i * 3 + 1], sk.S[i * 3 + 2]);
            }
            if (e.IrrallinenJalat) IkJalat(e, leike);
        }

        /// <summary>Keskustelun puhuja (KuunnelmaKaistale.PuhuvaHahmo; DioraamaSovitin asettaa joka kehys) ja tila. Saman huoneen
        /// paikallaan olevat kuulijat kääntyvät kohti puhujaa (enintään ±MaxKatseAsteet omasta suunnastaan, KatseNopeus °/s),
        /// ja puhuja kääntyy kohti edellistä puhujaa. Ei keskustelua → takaisin omaan suuntaan.</summary>
        public static string Puhuja, PuhujanTila, EdellinenPuhuja;
        const float MaxKatseAsteet = 70f, KatseNopeus = 90f, PuhujanMaxKatse = 150f;   // puhuja kääntyy kuulijaan myös työpisteeltä (7.10.)

        /// <summary>
        /// ELEET PUHEEN TAHDISSA (Siirtoseppä 7.10.2026; omistaja 7.10. 01.3x "linna loppuun mahdollisimman hyväksi (eleet yms.)"):
        /// puhujan kertaeleet (ele_puhe*, kysymyksessä ele_kysymys) lauseiden ja painotusten alkuun (Eleajoitus: kohdistuksesta tai
        /// puheen voimakkuudesta), kuulijat nyökkäävät lauseen lopussa (ele_nyokkays tai pään nyökkäys), puhuja katsoo kuulijoita
        /// vuorotellen painotuksissa, ja paikallaan olevien päät harhailevat hiljaa. "poikki eleet 0|1" (A/B samalla apilla).
        /// </summary>
        public static bool EleetPaalla = true;
        const double EleEnnakkoS = 0.2, NyokkaysS = 0.75;
        const float HarhailuYaw = 6f, HarhailuPitch = 2.5f, NyokkaysAst = 9f;
        static readonly Dictionary<Kohdistus, List<Eleajoitus.Tapahtuma>> eleKohdistukset = new Dictionary<Kohdistus, List<Eleajoitus.Tapahtuma>>();
        static readonly List<Eleajoitus.Tapahtuma> eleUlos = new List<Eleajoitus.Tapahtuma>();
        static readonly TasoAjoitus tasoAjoitus = new TasoAjoitus();
        static Kohdistus eleK; static double eleKohtaP = double.NaN, eleKohtaL = double.NaN; static string elePuhuja;
        static readonly HashSet<string> KuulijanEleet = new HashSet<string>(StringComparer.Ordinal) { "ele_nyokkays", "ele_kallistus", "ele_kuuntelu" };

        static int Siemen(Esiintyma e)
        {
            if (e.Siemen != int.MinValue) return e.Siemen;
            int h = 17; foreach (char c in e.HahmoId ?? "") h = h * 31 + c;
            return e.Siemen = h & 0x7fffffff;
        }

        void AjoitaEleet(double t)
        {
            if (Puhuja == null) { tasoAjoitus.Nollaa(); eleK = null; elePuhuja = null; return; }
            if (Puhuja != elePuhuja) { tasoAjoitus.Nollaa(); elePuhuja = Puhuja; }
            var sk = DioraamaAanet.SoivaKohdistus;
            string lahde;
            if (sk.HasValue)
            {
                lahde = "kohdistus";
                var k = sk.Value.Kohdistus; double kohta = sk.Value.Kohta;
                if (!eleKohdistukset.TryGetValue(k, out var lista)) eleKohdistukset[k] = lista = Eleajoitus.Kohdistuksesta(k);
                if (k != eleK || double.IsNaN(eleKohtaP) || kohta < eleKohtaL - 0.05) { eleK = k; eleKohtaP = kohta + EleEnnakkoS - 1e-4; eleKohtaL = kohta - 1e-4; }
                eleUlos.Clear();
                foreach (var x in lista)
                    if (x.Laji == Eleajoitus.Laji.Painotus ? x.T > eleKohtaP && x.T <= kohta + EleEnnakkoS : x.T > eleKohtaL && x.T <= kohta) eleUlos.Add(x);
                eleKohtaP = Math.Max(eleKohtaP, kohta + EleEnnakkoS); eleKohtaL = Math.Max(eleKohtaL, kohta);
            }
            else
            {
                lahde = "taso";
                eleK = null; eleUlos.Clear();
                var x = tasoAjoitus.Syota(t, DioraamaAanet.PuheenTaso());
                if (x.HasValue) eleUlos.Add(x.Value);
            }
            if (eleUlos.Count == 0) return;
            Esiintyma puhuja = null;
            foreach (var m in esiintymat) if (m.HahmoId == Puhuja && m.TilaId == PuhujanTila && m.Sekoitin != null && m.Nakyvissa) { puhuja = m; break; }
            foreach (var x in eleUlos)
            {
                if (x.Laji == Eleajoitus.Laji.Painotus)
                {
                    if (puhuja == null) continue;
                    AjoitaPuhujanEle(puhuja, t, x.Kysymys, lahde);
                    VaihdaKatse(puhuja);
                }
                else
                    foreach (var m in esiintymat)
                    {
                        if (m == puhuja || m.TilaId != PuhujanTila || m.Sekoitin == null || !m.Nakyvissa || m.Hahmo.Reitti != null) continue;
                        int h = (Siemen(m) * 7919 + m.NyokkaysLaskuri++ * 104729) & 0x7fffffff;
                        if (h % 100 >= 65) continue;   // ~2/3 kuulijoista nyökkää, ei kaikki yhtä aikaa
                        // Reaktio: kysymykseen pään kallistus, muuten nyökkäys (2/3) tai kuuntelu (1/3); puuttuva leike → pään nyökkäys.
                        string r = x.Kysymys ? "ele_kallistus" : h / 100 % 3 == 0 ? "ele_kuuntelu" : "ele_nyokkays";
                        if (m.Malli.Glb.Animaatio(r) == null) r = "ele_nyokkays";
                        m.KuulijaEle = r; m.NyokkaysAlku = t + 0.1 + (h % 7) * 0.05;
                        Debug.Log($"MATKAKIRJA linssit: nyökkäys {m.HahmoId} {(m.Malli.Glb.Animaatio(r) != null ? r : "pää")} ({lahde}{(x.Kysymys ? ", kysymys" : "")})");
                    }
            }
        }

        /// <summary>Puhujan kertaele painotukseen: kysymyksessä ele_kysymys, muuten hahmon ele_puhe*-leikkeistä vuorotellen (ei samaa
        /// peräkkäin). Ei katkaise soivaa vuoron eletä (vuorot[].ele) eikä edellistä ajoitettua.</summary>
        static void AjoitaPuhujanEle(Esiintyma e, double t, bool kysymys, string lahde)
        {
            var glb = e.Malli.Glb;
            if (e.EleNimi != null) { var ea = glb.Animaatio("ele_" + e.EleNimi); if (ea != null && t - e.EleAlku < ea.Kesto) return; }
            if (e.AjoitettuEle != null) { var aa = glb.Animaatio(e.AjoitettuEle); if (aa != null && t - e.AjoitettuAlku < aa.Kesto) return; }
            string valinta = null;
            if (kysymys && glb.Animaatio("ele_kysymys") != null) valinta = "ele_kysymys";
            else
            {
                var ehdokkaat = new List<string>();
                foreach (var a in glb.Animaatiot) if (a.Nimi.StartsWith("ele_puhe", StringComparison.Ordinal)) ehdokkaat.Add(a.Nimi);
                if (ehdokkaat.Count == 0) return;
                ehdokkaat.Sort(StringComparer.Ordinal);
                int i = (Siemen(e) + e.EleLaskuri++) % ehdokkaat.Count;
                if (ehdokkaat.Count > 1 && ehdokkaat[i] == e.AjoitettuEle) i = (i + 1) % ehdokkaat.Count;
                valinta = ehdokkaat[i];
            }
            e.AjoitettuEle = valinta; e.AjoitettuAlku = t;
            Debug.Log($"MATKAKIRJA linssit: ele ajoitettu {e.HahmoId} {valinta} ({lahde}{(kysymys ? ", kysymys" : "")})");
        }

        /// <summary>Puhuja katsoo painotuksissa vuorotellen saman huoneen paikallaan olevia kuulijoita (2 hengen keskustelussa aina toista).</summary>
        void VaihdaKatse(Esiintyma e)
        {
            var kuulijat = new List<string>();
            foreach (var m in esiintymat)
                if (m != e && m.TilaId == e.TilaId && m.Juuri != null && m.Nakyvissa && m.Hahmo.Reitti == null && !kuulijat.Contains(m.HahmoId)) kuulijat.Add(m.HahmoId);
            if (kuulijat.Count == 0) return;
            kuulijat.Sort(StringComparer.Ordinal);
            int i = e.KatseKohde == null ? (EdellinenPuhuja != null ? kuulijat.IndexOf(EdellinenPuhuja) : -1) : kuulijat.IndexOf(e.KatseKohde) + 1;
            e.KatseKohde = kuulijat[((i % kuulijat.Count) + kuulijat.Count) % kuulijat.Count];
        }

        /// <summary>Keskustelukumppani, jota hahmo katsoo: kuulija → puhuja, puhuja → valittu kuulija (tai edellinen puhuja).</summary>
        string KatseenKohde(Esiintyma e)
        {
            if (e.TilaId != PuhujanTila || Puhuja == null) { e.KatseKohde = null; return null; }
            if (e.HahmoId != Puhuja) { e.KatseKohde = null; return Puhuja; }
            if (!EleetPaalla) return EdellinenPuhuja;
            string valittu = e.KatseKohde ?? EdellinenPuhuja;
            if (valittu != null) return KuulijaKameranTakana(e, valittu) ? KameraKohde : valittu;
            // Ensimmäinen vuoro: lähin paikallaan oleva kuulija (sama kuin kameran puolilähikuvassa, DioraamaSovitin.PuhujaanPain).
            string lahin = null; float d2 = float.MaxValue;
            foreach (var m in esiintymat)
                if (m != e && m.TilaId == e.TilaId && m.Juuri != null && m.Nakyvissa && m.Hahmo.Reitti == null)
                {
                    float dx = (float)(m.Hahmo.Paikka.X - e.Hahmo.Paikka.X), dz = (float)(m.Hahmo.Paikka.Z - e.Hahmo.Paikka.Z);
                    if (dx * dx + dz * dz < d2) { d2 = dx * dx + dz * dz; lahin = m.HahmoId; }
                }
            // Ei paikallaan olevaa kuulijaa (keittiö: apulainen kävelee, iPhone 7.10. 06.38: kokki puhui selin): puhuja kääntyy kameraan,
            // kuten puolilähikuva (DioraamaSovitin.Puolilahikuva) asettuu kasvojen eteen.
            return lahin != null && !KuulijaKameranTakana(e, lahin) ? lahin : KameraKohde;
        }
        const string KameraKohde = "@kamera";
        /// <summary>Huoneen lepokameran suunta puhujasta kameraan (Unity, vaaka; DioraamaSovitin.PuhujaanPain asettaa). Vakaa viite
        /// kääntymiselle: liikkuva puolilähikamera seuraa puhujan suuntaa, joten sitä vasten kääntyminen jahtasi kameraa (iPad 7.10. 08.33).</summary>
        public static Vector3? LepoKameraSuunta;

        /// <summary>Kuulija kameran suunnasta katsottuna puhujan takana (yli KuulijaTakanaAst): puhujan kääntyminen kuulijaan veisi
        /// kasvot pois kamerasta (iPad 7.10. 07.27: vesipoika puhui selin, kun kokki oli seinän puolella) → puhuja kääntyy kameraan.</summary>
        bool KuulijaKameranTakana(Esiintyma e, string kuulija)
        {
            if (LepoKameraSuunta is not Vector3 k || e.Juuri == null) return false;
            foreach (var m in esiintymat)
                if (m != e && m.HahmoId == kuulija && m.TilaId == e.TilaId && m.Juuri != null)
                {
                    var p = e.Juuri.transform.position;
                    Vector3 h = m.Juuri.transform.position - p; k.y = h.y = 0;
                    return k.sqrMagnitude > 0.01f && h.sqrMagnitude > 0.01f && Vector3.Angle(k, h) > KuulijaTakanaAst;
                }
            return false;
        }
        const float KuulijaTakanaAst = 110f, PuhujaKameraAst = 60f;
        /// <summary>Puhujan pään yläpuolinen maailmanpiste (kasvokuvan ankkuri, Natiivi-UI:n pohja), tai null.</summary>
        public static Vector3? PuhujanPaa { get; private set; }
        /// <summary>Puhujan juuri ja kasvojen suunta (Unity) tältä kehykseltä: puolilähikuva seuraa myös kävelevää puhujaa (7.10.).</summary>
        public static Vector3? PuhujanJuuri { get; private set; }
        public static Vector3? PuhujanKasvot { get; private set; }
        /// <summary>Kohdistetun huoneen (PuhujanTila) näkyvät hahmot tältä kehykseltä: id, juuri ja kasvojen suunta (Unity). Puolilähikuva
        /// kehystää tulevan tai kävelevän puhujan elävästä paikasta ja välttää kuulijat kameran ja puhujan välissä (Päätoimittaja 7.10.).</summary>
        public static readonly List<(string Id, Vector3 Juuri, Vector3 Kasvot)> TilanHahmot = new List<(string, Vector3, Vector3)>();

        readonly Transform juuri;
        readonly Dictionary<string, HenkiloMalli> malliCache = new Dictionary<string, HenkiloMalli>(StringComparer.Ordinal);
        readonly List<Esiintyma> esiintymat = new List<Esiintyma>();
        readonly Dictionary<(string, string), HahmoNakyma> nakymaHaku = new Dictionary<(string, string), HahmoNakyma>();

        public DioraamaHahmot3D(Transform juuri) { this.juuri = juuri; }

        public int Maara => esiintymat.Count;
        public int MallejaLadattu => malliCache.Count;

        /// <summary>Karkea kolmioarvio ("poikki mittaus"): jaettu geometria lasketaan KERRAN per henkilö, ei
        /// per instanssi (ks. tiedoston yläkommentti) — eri kuin rakennus3D:n per-tila-laskenta.</summary>
        public int KolmiotJaetussaGeometriassa()
        {
            int n = 0;
            foreach (var hm in malliCache.Values)
                foreach (var lista in new[] { hm.Solmut, hm.SkinSolmut })
                    if (lista != null)
                        foreach (var sm in lista)
                            if (sm?.Mesh != null) n += (int)MeshKolmiot(sm.Mesh);
            return n;
        }

        /// <summary>Luo tämän tilan hahmo-instanssit (bookkeeping — GameObject syntyy vasta AsetaGlb:ssä, kun
        /// henkilön malli on ladattu). Ohittaa hahmon, jolla ei ole malli3d.glb:tä (2D-kortti hoitaa sen —
        /// DioraamaSovitin suodattaa sen 2D-puolelle, ei tämä luokka).</summary>
        public void LisaaTila(Rakennus rakennus, Tila tila, Action<string> kirjaa)
        {
            if (!Paalla || tila.Hahmot == null) return;
            foreach (var hahmo in tila.Hahmot)
            {
                if (rakennus.Henkilot == null || !rakennus.Henkilot.TryGetValue(hahmo.HenkiloId, out var henkilo)) continue;
                if (henkilo.Malli3d == null || string.IsNullOrEmpty(henkilo.Malli3d.NatiiviGlb)) continue;
                var e = new Esiintyma { TilaId = tila.Id, HahmoId = hahmo.Id, Hahmo = hahmo, Henkilo = henkilo };
                if (hahmo.Reitti != null) ValmisteleReitti(e, hahmo.Reitti);
                esiintymat.Add(e);
                // Toinen tila saattoi jo latauttaa saman henkilön mallin — rakenna heti, jos se on valmiina.
                if (malliCache.TryGetValue(henkilo.Malli3d.NatiiviGlb, out var malli)) Rakenna(e, malli);
            }
        }

        /// <summary>Glb-polut, joita tila tarvitsee mutta joita ei vielä ole ladattu (DioraamaSovitin lataa
        /// nämä) — sama malli kuin DioraamaHahmot.TarvittavatAtlakset, mutta avain on glb-POLKU, ei henkilö-id
        /// (useampi henkilö voisi periaatteessa jakaa polun, kuten atlaksellakin).</summary>
        public void TarvittavatGlb(Rakennus rakennus, Tila tila, List<string> ulos)
        {
            if (!Paalla || tila.Hahmot == null) return;
            foreach (var hahmo in tila.Hahmot)
            {
                if (rakennus.Henkilot == null || !rakennus.Henkilot.TryGetValue(hahmo.HenkiloId, out var henkilo)) continue;
                string glb = henkilo.Malli3d?.NatiiviGlb;
                if (string.IsNullOrEmpty(glb) || malliCache.ContainsKey(glb) || ulos.Contains(glb)) continue;
                ulos.Add(glb);
            }
        }

        /// <summary>Henkilön glb ladattu ja jäsennetty (DioraamaGlb.Lue(tavut, unityyn:true) — paikat/normaalit/
        /// translation/rotation ovat siis JO Unity-peilattuja). Rakentaa jaetun Mesh/Material-mallin kerran ja
        /// rakentaa Transform-hierarkian kaikille tätä glb-polkua jo odottaville Esiintymille (LisaaTila saattoi
        /// luoda niitä ennen tätä kutsua — sama jälkikäteistäydennys kuin DioraamaHahmot.AsetaAtlas).</summary>
        public void AsetaGlb(string glbPolku, GlbMalli malli)
        {
            if (string.IsNullOrEmpty(glbPolku) || malli?.Solmut == null || malli.Solmut.Count == 0 || malliCache.ContainsKey(glbPolku)) return;
            var materiaaliCache = new Dictionary<string, Material>(StringComparer.Ordinal);
            var hm = new HenkiloMalli { Glb = malli, Solmut = new SolmuMalli[malli.Solmut.Count] };
            hm.Skin = malli.Skinit.Count > 0 && malli.Animaatiot.Count > 0;
            if (hm.Skin) hm.SkinSolmut = new SolmuMalli[malli.Solmut.Count];
            for (int i = 0; i < malli.Solmut.Count; i++)
            {
                var s = malli.Solmut[i];
                if (s.Osat.Count == 0) continue;
                if (hm.Skin && s.Skin >= 0 && s.Skin < malli.Skinit.Count) hm.SkinSolmut[i] = RakennaSkinMalli(malli, s, hm, materiaaliCache);
                else hm.Solmut[i] = RakennaSolmuMalli(s, materiaaliCache);
            }
            malliCache[glbPolku] = hm;
            foreach (var e in esiintymat)
                if (e.Juuri == null && e.Henkilo.Malli3d?.NatiiviGlb == glbPolku) Rakenna(e, hm);
        }

        /// <summary>Rakentaa yhden hahmo-instanssin Transform-hierarkian jaetusta HenkiloMalli-oliosta: kaikki
        /// solmut ensin ilman vanhempaa (ei riipu Glb.Solmut-taulukon järjestyksestä), sitten vanhempi-lapsi-
        /// suhteet toisessa kierroksessa (GlbSolmu.Vanhempi-indeksi).</summary>
        void Rakenna(Esiintyma e, HenkiloMalli malli)
        {
            var solmut = malli.Glb.Solmut;
            var go = new GameObject("Hahmo3D:" + e.TilaId + "/" + e.HahmoId) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.SetActive(false); // Paivita asettaa oikean tilan ensimmäisellä kutsulla (Nakyvissa-vertailu).
            var solmuT = new Transform[solmut.Count];
            for (int i = 0; i < solmut.Count; i++)
            {
                var s = solmut[i];
                var sg = new GameObject(s.Nimi) { layer = DioraamaNayttamo.Kerros };
                sg.transform.localPosition = new Vector3(s.Translation[0], s.Translation[1], s.Translation[2]);
                sg.transform.localRotation = new Quaternion(s.Rotation[0], s.Rotation[1], s.Rotation[2], s.Rotation[3]);
                sg.transform.localScale = new Vector3(s.Scale[0], s.Scale[1], s.Scale[2]);
                solmuT[i] = sg.transform;
                var sm = malli.Solmut[i];
                if (sm?.Mesh != null)
                {
                    sg.AddComponent<MeshFilter>().sharedMesh = sm.Mesh;
                    var r = sg.AddComponent<MeshRenderer>();
                    r.sharedMaterials = sm.Materiaalit;
                    // era 2b (kohta 2): aurinko+lamput+tuli heittävät ja vastaanottavat varjoja, sama kuin
                    // DioraamaRakennus.cs:n rakennusosat.
                    r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.On;
                    r.receiveShadows = true;
                }
            }
            for (int i = 0; i < solmut.Count; i++)
                solmuT[i].SetParent(solmut[i].Vanhempi >= 0 ? solmuT[solmut[i].Vanhempi] : go.transform, false);
            if (malli.Skin)
            {
                // SKIN: SkinnedMeshRenderer skinnatulle solmulle; luut = skinin nivelsolmujen Transformit. Unity laskee
                // kärjet luiden maailmamatriiseista × bindpose (= glTF:n inverseBindMatrix), joten solmun oma TRS ei
                // vaikuta (glTF-spec: skinnatun meshin solmun muunnos ohitetaan).
                for (int i = 0; i < solmut.Count; i++)
                {
                    var sm = malli.SkinSolmut[i];
                    if (sm?.Mesh == null) continue;
                    var skin = malli.Glb.Skinit[solmut[i].Skin];
                    var luut = new Transform[skin.Nivelet.Length];
                    for (int j = 0; j < luut.Length; j++) luut[j] = solmuT[skin.Nivelet[j]];
                    var smr = solmuT[i].gameObject.AddComponent<SkinnedMeshRenderer>();
                    smr.sharedMesh = sm.Mesh;
                    smr.sharedMaterials = sm.Materiaalit;
                    smr.bones = luut;
                    smr.rootBone = luut.Length > 0 ? luut[0] : solmuT[i];
                    smr.quality = SkinQuality.Bone4;
                    smr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.On;
                    smr.receiveShadows = true;
                    // Rajat juuriluun kehyksessä: hahmon koko laatikko + liikevara (ei updateWhenOffscreeniä, kallis).
                    smr.localBounds = new Bounds(new Vector3(0f, 0.9f, 0f), new Vector3(2.4f, 2.4f, 2.4f));
                    if (sm.Mesh.blendShapeCount > 0)
                    {
                        var suu = new int[Visemit.Nimet.Length];
                        for (int v = 0; v < suu.Length; v++) suu[v] = sm.Mesh.GetBlendShapeIndex(Visemit.Nimet[v]);
                        (e.Kasvot ??= new List<(SkinnedMeshRenderer, int[], int, int)>()).Add(
                            (smr, suu, sm.Mesh.GetBlendShapeIndex("eyeBlinkLeft"), sm.Mesh.GetBlendShapeIndex("eyeBlinkRight")));
                    }
                }
                if (e.Kasvot != null) Debug.Log($"MATKAKIRJA linssit: kasvot {e.HahmoId}: {e.Kasvot.Count} muotomeshiä");
                float sk = (float)(e.Henkilo.Malli3d?.Skin?.Skaala ?? 1);
                go.transform.localScale = new Vector3(sk, sk, sk);
                e.Sekoitin = new DioraamaSekoitin(malli.Glb);
            }
            LisaaKontaktivarjo(go.transform);
            e.Juuri = go;
            e.SolmuT = solmuT;
            e.Malli = malli;
            // Elävä linna: lyhty (hahmo.lyhty) oikean käden kohdalle, liekki DioraamaLiekit-3D-mallista.
            if (e.Hahmo.Lyhty && LyhdynLuoja != null)
            {
                var lyhty = LyhdynLuoja(go.transform);
                if (lyhty != null) lyhty.transform.localPosition = new Vector3(0.28f, 0.95f, 0.12f);
            }
        }

        /// <summary>Kontaktivarjo (omistaja 2.10. 20.2x: "kävelijä tarvitsee vielä varjon jalkojensa alle"): linnan leivotut
        /// lattiat eivät ota reaaliaikaista varjoa vastaan, joten JOKAISEN 3D-hahmon (skinnattu ja nivelhahmo, kävelijä ja
        /// seisoja) juuren alle tulee pehmeä levy, joka liikkuu ja kääntyy hahmon mukana. Periaate kuten kartan symbolimallien
        /// maakontaktissa (Symbolimallit.Rakentaja PohjaVerkko): peitto keskellä, pehmeä lasku reunalle.</summary>
        const float VarjoSade = 0.55f, VarjoNosto = 0.012f;
        // Kerroin 0,3 (savuke 22.32, lokit/siirtoseppa-skin17): 0,63 piirtyi koko ajan (lattia tummui keskellä ~0,6:een), mutta
        // ydin jää jalkojen alle eikä heikko reuna erotu tummalla lattialla; 0,3 näkyy selvänä pehmeänä varjona.
        static readonly Color VarjoVari = new Color(0.3f, 0.29f, 0.28f, 1f);
        static Mesh varjoVerkko;
        static Material varjoMateriaali;

        static void LisaaKontaktivarjo(Transform juuri)
        {
            if (varjoVerkko == null)
            {
                varjoVerkko = new Mesh { name = "Hahmo3D-kontaktivarjo" };
                varjoVerkko.SetVertices(new[] { new Vector3(-1, 0, -1), new Vector3(1, 0, -1), new Vector3(1, 0, 1), new Vector3(-1, 0, 1) });
                varjoVerkko.SetUVs(0, new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) });
                varjoVerkko.SetNormals(new[] { Vector3.up, Vector3.up, Vector3.up, Vector3.up });
                varjoVerkko.SetTriangles(new[] { 0, 2, 1, 0, 3, 2 }, 0);
                varjoVerkko.RecalculateBounds();
            }
            if (varjoMateriaali == null)
            {
                var sh = Resources.Load<Shader>("Varjostimet/DioraamaKontaktivarjo");
                if (sh == null) { Debug.LogWarning("MATKAKIRJA linssit: kontaktivarjon varjostin puuttuu (Varjostimet/DioraamaKontaktivarjo)"); return; }
                varjoMateriaali = new Material(sh) { name = "Hahmo3D/kontaktivarjo" };
                varjoMateriaali.SetColor("_VarjoVari", VarjoVari);
            }
            var g = new GameObject("Kontaktivarjo") { layer = DioraamaNayttamo.Kerros };
            g.transform.SetParent(juuri, false);
            g.transform.localPosition = new Vector3(0f, VarjoNosto, 0f);
            g.transform.localScale = new Vector3(VarjoSade, 1f, VarjoSade);
            g.AddComponent<MeshFilter>().sharedMesh = varjoVerkko;
            var r = g.AddComponent<MeshRenderer>();
            r.sharedMaterial = varjoMateriaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        /// <summary>DioraamaNayttamo asettaa: luo lyhdyn liekin annetun juuren lapseksi (DioraamaLiekit.LuoLyhty).</summary>
        public static Func<Transform, GameObject> LyhdynLuoja;

        /// <summary>Yhden solmun mesh (submesh per osa) + materiaalit (SAMA rakenne kuin DioraamaRakennus.
        /// LisaaTila, mutta yhdelle solmulle koko tilan sijaan — ei UV:tä eikä lämpöä, hahmoilla ei ole
        /// pohjakuvaa eikä tulen leipomaa lämpöä, ks. glb.mjs:n COLOR_0-kommentti: R=AO=1, G=lämpö=0).</summary>
        static SolmuMalli RakennaSolmuMalli(GlbSolmu s, Dictionary<string, Material> materiaaliCache)
        {
            int kaikkiKarjet = 0;
            foreach (var osa in s.Osat) kaikkiKarjet += (osa.Paikat?.Length ?? 0) / 3;
            var paikat = new Vector3[kaikkiKarjet];
            var normaalit = new Vector3[kaikkiKarjet];
            var uvt = new Vector2[kaikkiKarjet];
            var varit = new Color32[kaikkiKarjet];
            var materiaalit = new Material[s.Osat.Count];
            var kolmiotOsittain = new int[s.Osat.Count][];
            int kv = 0;
            for (int oi = 0; oi < s.Osat.Count; oi++)
            {
                var osa = s.Osat[oi];
                int n = (osa.Paikat?.Length ?? 0) / 3;
                for (int i = 0; i < n; i++)
                {
                    paikat[kv + i] = new Vector3(osa.Paikat[i * 3], osa.Paikat[i * 3 + 1], osa.Paikat[i * 3 + 2]);
                    normaalit[kv + i] = osa.Normaalit != null && osa.Normaalit.Length >= (i + 1) * 3
                        ? new Vector3(osa.Normaalit[i * 3], osa.Normaalit[i * 3 + 1], osa.Normaalit[i * 3 + 2]) : Vector3.up;
                    varit[kv + i] = osa.Varit != null && osa.Varit.Length >= (i + 1) * 4
                        ? new Color32(osa.Varit[i * 4], osa.Varit[i * 4 + 1], osa.Varit[i * 4 + 2], osa.Varit[i * 4 + 3])
                        : new Color32(255, 0, 0, 255);
                }
                int[] lahde = osa.Kolmiot ?? Array.Empty<int>();
                var kolmiot = new int[lahde.Length];
                for (int i = 0; i < lahde.Length; i++) kolmiot[i] = lahde[i] + kv;
                kolmiotOsittain[oi] = kolmiot;
                materiaalit[oi] = MateriaaliOsalle(osa, materiaaliCache);
                kv += n;
            }
            var mesh = new Mesh { name = "Hahmo3D:" + (s.Osat.Count > 0 ? s.Osat[0].Pinta : "?"), indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.SetVertices(paikat);
            mesh.SetNormals(normaalit);
            mesh.SetUVs(0, uvt); // aina (0,0) — glb.mjs synteesoi TEXCOORD_0:n samoin, ei tekstuuria.
            mesh.SetColors(varit);
            mesh.subMeshCount = s.Osat.Count;
            for (int oi = 0; oi < s.Osat.Count; oi++) mesh.SetTriangles(kolmiotOsittain[oi], oi);
            mesh.RecalculateBounds();
            return new SolmuMalli { Mesh = mesh, Materiaalit = materiaalit };
        }

        /// <summary>SKIN: skinnatun solmun mesh (submesh per primitiivi) painoineen ja bindposeineen + materiaalit
        /// (baseColorTexture → _Tila 1 / _PohjaKuva, muuten baseColorFactor kuten nivelhahmoilla). UV:n v käännetään
        /// (glTF vasen ylä → Unity vasen ala, sama kuin DioraamaUlkokuori).</summary>
        static SolmuMalli RakennaSkinMalli(GlbMalli malli, GlbSolmu s, HenkiloMalli hm, Dictionary<string, Material> materiaaliCache)
        {
            var skin = malli.Skinit[s.Skin];
            int kaikki = 0;
            foreach (var osa in s.Osat) kaikki += (osa.Paikat?.Length ?? 0) / 3;
            var paikat = new Vector3[kaikki];
            var normaalit = new Vector3[kaikki];
            var uvt = new Vector2[kaikki];
            var varit = new Color32[kaikki];
            var painot = new BoneWeight[kaikki];
            var materiaalit = new Material[s.Osat.Count];
            var kolmiotOsittain = new int[s.Osat.Count][];
            int kv = 0;
            for (int oi = 0; oi < s.Osat.Count; oi++)
            {
                var osa = s.Osat[oi];
                int n = (osa.Paikat?.Length ?? 0) / 3;
                for (int i = 0; i < n; i++)
                {
                    paikat[kv + i] = new Vector3(osa.Paikat[i * 3], osa.Paikat[i * 3 + 1], osa.Paikat[i * 3 + 2]);
                    normaalit[kv + i] = osa.Normaalit != null && osa.Normaalit.Length >= (i + 1) * 3
                        ? new Vector3(osa.Normaalit[i * 3], osa.Normaalit[i * 3 + 1], osa.Normaalit[i * 3 + 2]) : Vector3.up;
                    uvt[kv + i] = osa.Uv != null && osa.Uv.Length >= (i + 1) * 2 ? new Vector2(osa.Uv[i * 2], 1f - osa.Uv[i * 2 + 1]) : Vector2.zero;
                    // R = AO 1, G = lämpö 0, B = 128 (varjostimen B-tilan kerroin 1).
                    varit[kv + i] = new Color32(255, 0, 128, 255);
                    painot[kv + i] = Paino(osa, i, skin.Nivelet.Length);
                }
                int[] lahde = osa.Kolmiot ?? Array.Empty<int>();
                var kolmiot = new int[lahde.Length];
                for (int i = 0; i < lahde.Length; i++) kolmiot[i] = lahde[i] + kv;
                kolmiotOsittain[oi] = kolmiot;
                materiaalit[oi] = osa.Kuva >= 0 && osa.Kuva < malli.Kuvat.Count && malli.Kuvat[osa.Kuva] != null
                    ? KuvaMateriaali(malli, osa.Kuva, hm, materiaaliCache) : MateriaaliOsalle(osa, materiaaliCache);
                kv += n;
            }
            var bindposet = new Matrix4x4[skin.Nivelet.Length];
            for (int j = 0; j < bindposet.Length; j++)
            {
                var m = new Matrix4x4();
                for (int c = 0; c < 16; c++) m[c % 4, c / 4] = skin.KaanteisetSidonnat[j * 16 + c];
                bindposet[j] = m;
            }
            var mesh = new Mesh { name = "Hahmo3D-skin:" + s.Nimi, indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.SetVertices(paikat);
            mesh.SetNormals(normaalit);
            mesh.SetUVs(0, uvt);
            mesh.SetColors(varit);
            mesh.subMeshCount = s.Osat.Count;
            for (int oi = 0; oi < s.Osat.Count; oi++) mesh.SetTriangles(kolmiotOsittain[oi], oi);
            mesh.boneWeights = painot;
            mesh.bindposes = bindposet;
            LisaaMuodot(mesh, s.Osat, kaikki);
            mesh.RecalculateBounds();
            return new SolmuMalli { Mesh = mesh, Materiaalit = materiaalit };
        }

        /// <summary>
        /// MORPH (FACEIT, Päätoimittaja 6.10.2026, juna 150): primitiivien muodot (GlbOsa.Muodot, ARKit-nimet) meshin blend shape
        /// -kehyksiksi nimittäin; primitiivi, jolla muotoa ei ole, saa nollan. Paino 0–100 (SkinnedMeshRenderer.SetBlendShapeWeight).
        /// Normaalit eivät muutu (FACEIT-vienti antaa vain POSITION-deltat; pieni suun liike ei tarvitse niitä).
        /// </summary>
        static void LisaaMuodot(Mesh mesh, List<GlbOsa> osat, int kaikki)
        {
            var nimet = new List<string>();
            foreach (var osa in osat) foreach (var (n, _) in osa.Muodot) if (!nimet.Contains(n)) nimet.Add(n);
            if (nimet.Count == 0) return;
            foreach (var nimi in nimet)
            {
                var d = new Vector3[kaikki];
                int kv = 0;
                foreach (var osa in osat)
                {
                    int n = (osa.Paikat?.Length ?? 0) / 3;
                    foreach (var (mn, deltat) in osa.Muodot)
                        if (mn == nimi) for (int i = 0; i < n; i++) d[kv + i] = new Vector3(deltat[i * 3], deltat[i * 3 + 1], deltat[i * 3 + 2]);
                    kv += n;
                }
                mesh.AddBlendShapeFrame(nimi, 100f, d, null, null);
            }
        }

        static readonly float[] suuPainot = new float[Visemit.Nimet.Length];

        /// <summary>
        /// FACEIT-KASVOT (Päätoimittaja 6.10.2026, juna 150): räpäytys aina (hahmon vakaa siemen), suu vain puhujalla:
        /// soivan puheen kohdistuksesta (Visemit.Laske, sama kello kuin avainsanoilla) tai ilman kohdistusta puheen
        /// voimakkuudesta jawOpeniin (pehmennetty). Painot 0–100.
        /// </summary>
        static void PaivitaKasvot(Esiintyma e, double t)
        {
            if (e.Kasvot == null) return;
            int siemen = 17;
            foreach (char c in e.HahmoId ?? "") siemen = siemen * 31 + c;
            float rap = Visemit.Rapaytys(siemen, t);
            Array.Clear(suuPainot, 0, suuPainot.Length);
            if (Puhuja != null && Puhuja == e.HahmoId)
            {
                var sk = DioraamaAanet.SoivaKohdistus;
                if (sk.HasValue) Visemit.Laske(sk.Value.Kohdistus, sk.Value.Kohta, suuPainot);
                else
                {
                    e.SuuTaso = Mathf.Lerp(e.SuuTaso, DioraamaAanet.PuheenTaso(), 0.35f);
                    suuPainot[0] = e.SuuTaso * 0.6f;
                }
            }
            else e.SuuTaso = 0f;
            foreach (var (r, suu, vasen, oikea) in e.Kasvot)
            {
                if (r == null) continue;
                for (int v = 0; v < suu.Length; v++) if (suu[v] >= 0) r.SetBlendShapeWeight(suu[v], suuPainot[v] * 100f);
                if (vasen >= 0) r.SetBlendShapeWeight(vasen, rap * 100f);
                if (oikea >= 0) r.SetBlendShapeWeight(oikea, rap * 100f);
            }
        }

        /// <summary>Kärjen 4 nivelpainoa normalisoituna (glTF-painojen summa voi poiketa 1:stä pyöristyksen takia).</summary>
        static BoneWeight Paino(GlbOsa osa, int i, int niveliä)
        {
            if (osa.Nivelet == null || osa.Painot == null) return new BoneWeight { weight0 = 1f };
            int o = i * 4;
            float w0 = osa.Painot[o], w1 = osa.Painot[o + 1], w2 = osa.Painot[o + 2], w3 = osa.Painot[o + 3];
            float summa = w0 + w1 + w2 + w3;
            if (summa <= 1e-6f) return new BoneWeight { weight0 = 1f };
            int N(int k) => Mathf.Clamp(osa.Nivelet[o + k], 0, niveliä - 1);
            return new BoneWeight
            {
                boneIndex0 = N(0), weight0 = w0 / summa, boneIndex1 = N(1), weight1 = w1 / summa,
                boneIndex2 = N(2), weight2 = w2 / summa, boneIndex3 = N(3), weight3 = w3 / summa,
            };
        }

        /// <summary>Upotetun perusvärikuvan materiaali (_Tila 1, _PohjaKuva sRGB) — yksi per kuva-indeksi.</summary>
        static Material KuvaMateriaali(GlbMalli malli, int kuva, HenkiloMalli hm, Dictionary<string, Material> cache)
        {
            string avain = "kuva:" + kuva;
            if (cache.TryGetValue(avain, out var m)) return m;
            var tex = new Texture2D(2, 2, TextureFormat.RGBA32, true, false) { name = "Hahmo3D-kuva" + kuva };
            if (!tex.LoadImage(malli.Kuvat[kuva], false)) { UnityEngine.Object.Destroy(tex); tex = null; }
            else { tex.wrapMode = TextureWrapMode.Repeat; tex.Apply(true, true); hm.Tekstuurit.Add(tex); }
            m = new Material(Varjostin()) { name = "Hahmo3D/" + avain };
            m.SetColor(IdVari, Color.white);
            if (tex != null) { m.SetTexture(IdPohjaKuva, tex); m.SetFloat(IdTila, 1f); }
            else m.SetFloat(IdTila, 0f);
            m.SetFloat(IdKuvioTyyppi, 0f);
            cache[avain] = m;
            return m;
        }

        /// <summary>Yksi materiaali per (henkilö, pinta) — jaettu KAIKKIEN samaa pintaa käyttävien solmujen
        /// kesken tämän henkilön mallissa (esim. "iho" kaulassa, päässä ja käsissä). _Tila 0 (A, proseduraalinen)
        /// ja _KuvioTyyppi 0 ("tasainen") KIINTEÄSTI, kohdan 4 vaatimus "kuvio tasainen" — ei pohjakuvaa.</summary>
        static Material MateriaaliOsalle(GlbOsa osa, Dictionary<string, Material> cache)
        {
            string avain = osa.Pinta ?? "?";
            if (cache.TryGetValue(avain, out var m)) return m;
            m = new Material(Varjostin()) { name = "Hahmo3D/" + avain };
            var v = osa.Vari;
            Color vari = v != null && v.Length >= 4
                ? new Color(LinearistaSrgbiksi(v[0]), LinearistaSrgbiksi(v[1]), LinearistaSrgbiksi(v[2]), v[3])
                : Color.white;
            m.SetColor(IdVari, vari);
            m.SetFloat(IdTila, 0f);
            m.SetFloat(IdKuvioTyyppi, 0f);
            cache[avain] = m;
            return m;
        }

        /// <summary>Joka ruutu: näkyvyys/silmukka Ytimestä (Heratys.HahmonTila, Nakyma.Hahmot), nivelten
        /// kierrot silmukan animaatiosta (Liikkeet.NivelKulmat) ja paikka/kasvot (kohde tai reitti).</summary>
        public void Paivita(Rakennus rakennus, Nakyma nakyma, double t)
        {
            nakymaHaku.Clear();
            PuhujanPaa = null; PuhujanJuuri = null; PuhujanKasvot = null; TilanHahmot.Clear();
            if (nakyma.Hahmot != null) foreach (var hn in nakyma.Hahmot) nakymaHaku[(hn.TilaId, hn.HahmoId)] = hn;
            if (EleetPaalla) AjoitaEleet(t);

            foreach (var e in esiintymat)
            {
                if (e.Juuri == null) continue; // glb ei ole vielä latautunut — ei GameObjectia, ei mitään tehtävää.
                if (e.TilaId == "irrallinen") { PaivitaIrrallinen(e); continue; }
                if (PiilotetutTilat.Contains(e.TilaId) || PiilotetutHenkilot.Contains(e.Hahmo?.HenkiloId ?? "")) { if (e.Nakyvissa) { e.Juuri.SetActive(false); e.Nakyvissa = false; } continue; }
                if (!nakymaHaku.TryGetValue((e.TilaId, e.HahmoId), out var hn) || !hn.Naky)
                {
                    if (e.Nakyvissa) { e.Juuri.SetActive(false); e.Nakyvissa = false; }
                    continue;
                }
                if (!e.Nakyvissa) { e.Juuri.SetActive(true); e.Nakyvissa = true; }
                if (e.Sekoitin != null) { PaivitaSkin(e, hn, t); continue; }

                // Silmukka (kohta 4): Heratys.HahmonTilan silmukka, PAITSI 'kanto' korvaa 'kavelyn', kun
                // henkilön esine on sanko (kävely + sanko -- vesipoika kantaa vettä kävellessään reittiään).
                string silmukkaNimi = hn.Silmukka ?? "idle";
                if (silmukkaNimi == "kavely" && e.Henkilo.Malli3d?.Esine == "sanko") silmukkaNimi = "kanto";
                if (!rakennus.Liikkeet.TryGetValue(silmukkaNimi, out var liike) && !rakennus.Liikkeet.TryGetValue("idle", out liike))
                {
                    PaivitaSijainti(e, t); // ei liikedataa (ei pitäisi tapahtua) -- paikka/kasvot päivittyvät yhä.
                    continue;
                }

                // Deterministinen per-hahmo vaihesiirto (SAMA FNV-1a-kaava kuin DioraamaHahmot.VaiheYksikko),
                // ETTÄ kaikki samaa silmukkaa toistavat hahmot eivät nyki tahdissa. Jatkuva (ei kvantisoitu
                // fps:ään, toisin kuin 2D-atlaksen ruutu) -- kohdan 4 "asettaa ... joka ruutu" TULKITTU jatkuvana.
                double kestoS = liike.KestoS > 0 ? liike.KestoS : 1.0;
                // Omistaja 30.9. (TF 1.1 (81), Linnanrakentajan juurisyy): vartija "käveli oudosti". Reittihahmon
                // kävelytahti seuraa reitin nopeutta (silmukka on mitoitettu ~1,4 m/s:iin; 0,8 m/s:lla jalat liukuivat
                // ~45 %), ja päiden tauoilla kävely vaihtuu idleen 0,25 s:ssa (ei paikallaan kävelyä).
                bool kavelee = e.Hahmo.Reitti != null && (silmukkaNimi == "kavely" || silmukkaNimi == "kanto");
                double kavelyPaino = 1;
                if (kavelee)
                {
                    double nopeus = e.Hahmo.Reitti.Nopeus > 0 ? e.Hahmo.Reitti.Nopeus : 1.0;
                    kestoS *= KavelyNopeus / nopeus;
                    kavelyPaino = ReittiPaikkaJaSuunta(e, t).kavely;
                }
                double t01 = Mod(t + VaiheYksikko(e.HahmoId) * kestoS, kestoS) / kestoS;
                var kulmat = Liikkeet.NivelKulmat(liike, t01);
                double nousu = Liikkeet.JuuriNousu(liike, t01);
                Dictionary<string, double[]> lepoKulmat = null;
                if (kavelyPaino < 1 && rakennus.Liikkeet.TryGetValue("idle", out var idle))
                {
                    double idleS = idle.KestoS > 0 ? idle.KestoS : 1.0;
                    double i01 = Mod(t + VaiheYksikko(e.HahmoId) * idleS, idleS) / idleS;
                    lepoKulmat = Liikkeet.NivelKulmat(idle, i01);
                    nousu = Liikkeet.JuuriNousu(idle, i01) + (nousu - Liikkeet.JuuriNousu(idle, i01)) * kavelyPaino;
                }
                var solmut = e.Malli.Glb.Solmut;
                for (int i = 0; i < solmut.Count; i++)
                {
                    var kulma = kulmat.TryGetValue(solmut[i].Nimi, out var k) ? k : Lepo;
                    if (lepoKulmat != null)
                    {
                        var l = lepoKulmat.TryGetValue(solmut[i].Nimi, out var lk) ? lk : Lepo;
                        kulma = new[] { l[0] + (kulma[0] - l[0]) * kavelyPaino, l[1] + (kulma[1] - l[1]) * kavelyPaino, l[2] + (kulma[2] - l[2]) * kavelyPaino };
                    }
                    e.SolmuT[i].localRotation = NivelKierto(kulma[0], kulma[1], kulma[2]);
                }
                PaivitaSijainti(e, t, nousu);
            }
        }

        /// <summary>SKINNATTU HAHMO (omistaja loki 59b9df127): silmukka → GLB-leike (malli3d.leikkeet), crossFade 0,25 s
        /// (THREE.AnimationMixer.crossFadeTo-pariteetti), reittihahmon kävely sidottu nopeuteen (aikakerroin = m/s ×
        /// leikkeen kesto / kavely_sykli_m, jalat eivät liu'u) ja tauoilla idle. Vaihe per hahmo kuten nivelhahmoilla.</summary>
        void PaivitaSkin(Esiintyma e, HahmoNakyma hn, double t)
        {
            var m3 = e.Henkilo.Malli3d?.Skin;
            string silmukka = hn.Silmukka ?? "idle";
            // Kanto kulkee kuten kävely (Linnanrakentaja 6.10.: UAL-jalat + kantokädet, sama askel): nopeuteen sidottu, tauoilla idle.
            bool reitilla = e.Hahmo.Reitti != null && (silmukka == "kavely" || silmukka == "kanto");
            double kavely = reitilla ? ReittiPaikkaJaSuunta(e, t).kavely : 1;
            string tavoite = reitilla && kavely < 0.5 ? "idle" : silmukka;
            // Kanto-reitin tauko (Linnanrakentaja 6.10.): kannettava esine näkyy vain kantoleikkeissä, joten tauolla "kanto_idle",
            // jos se on; puhuessa perus+"_puhe" alla (kanto_puhe) kuten istuu_puhe.
            if (tavoite == "idle" && silmukka == "kanto" && e.Malli.Glb.Animaatio(Leike(m3, "kanto_idle")) != null) tavoite = "kanto_idle";
            // Istuva tai polvistuva hahmo puhuu asennossaan (Päätoimittaja 5.10. 22.0x: kappalainen polvistuu jakkaralle, mutta
            // puhuessaan seisoi jakkaran PÄÄLLÄ): perussilmukalle "<s>_puhe"-leike (esim. istuu_puhe) puheen ja eleen tilalle.
            string perus = e.Hahmo.Silmukka;
            if (!string.IsNullOrEmpty(perus) && perus != "idle" && perus != "kavely" && tavoite != perus && !reitilla
                && e.Malli.Glb.Animaatio(Leike(m3, perus + "_puhe")) != null)
                tavoite = perus + "_puhe";
            e.Silmukka = tavoite;
            string leike = Leike(m3, tavoite);
            bool ensimmainen = e.Sekoitin.Nykyinen == null;
            // Idle ↔ puhe: pidempi häivytys (omistaja 5.10.: siirtymät "outoja"), muut ennallaan.
            bool puheTaiEle = tavoite != "idle" && tavoite != "kavely" && tavoite != "tyo" && tavoite != "kanto" && tavoite != "kanto_idle";
            float haivytys = ensimmainen ? 0f : puheTaiEle || e.Sekoitin.Nykyinen == Leike(m3, "puhe") ? PuheHaivytysS : HaivytysS;
            // Ele kertaliikkeenä (Linnanrakentaja 5.10.: vuorot[].ele → glb-leike "ele_<ele>", 1,2–3 s): vuoron alussa
            // puheen päälle häivytyksellä ja ennen leikkeen loppua takaisin puheeseen; ilman eleleikettä puhe (kuten ennen).
            if (puheTaiEle && tavoite != "puhe" && e.Malli.Glb.Animaatio(leike) == null)
            {
                var ea = e.Malli.Glb.Animaatio("ele_" + tavoite);
                if (e.EleNimi != tavoite) { e.EleNimi = tavoite; e.EleAlku = t; Debug.Log($"MATKAKIRJA linssit: ele {e.HahmoId} {(ea != null ? $"ele_{tavoite} ({ea.Kesto:0.0} s)" : tavoite + " puuttuu → puhe")}"); }
                leike = ea != null && t - e.EleAlku < ea.Kesto - PuheHaivytysS ? "ele_" + tavoite : Leike(m3, "puhe");
            }
            else if (!puheTaiEle || tavoite == "puhe") e.EleNimi = null;
            // Ajoitettu kertaele (painotus) puheen päälle, kun vuoron ele ei soi; puhe loppuu → ele pois.
            if (!puheTaiEle) e.AjoitettuEle = null;
            else if (EleetPaalla && e.AjoitettuEle != null && !leike.StartsWith("ele_", StringComparison.Ordinal))
            {
                var aa = e.Malli.Glb.Animaatio(e.AjoitettuEle);
                if (aa != null && t >= e.AjoitettuAlku && t - e.AjoitettuAlku < aa.Kesto - PuheHaivytysS) leike = e.AjoitettuEle;
            }
            // Kuulijan reaktio leikkeenä (ele_nyokkays/kallistus/kuuntelu), kun hahmo seisoo idlessä; muuten pään nyökkäys PaaKatsessa.
            if (EleetPaalla && tavoite == "idle" && e.KuulijaEle != null)
            {
                var na = e.Malli.Glb.Animaatio(e.KuulijaEle);
                if (na != null && t >= e.NyokkaysAlku && t - e.NyokkaysAlku < na.Kesto - PuheHaivytysS) leike = e.KuulijaEle;
            }
            if (e.KuulijaEle != null && !ensimmainen && (leike == e.KuulijaEle || e.Sekoitin.Nykyinen == e.KuulijaEle)) haivytys = PuheHaivytysS;
            // Ele (vuorot[].ele) → puhe → idle: puuttuva eleleike ei pysäytä puhetta.
            if (!e.Sekoitin.Toista(leike, haivytys) && !(puheTaiEle && e.Sekoitin.Toista(Leike(m3, "puhe"), haivytys)))
                e.Sekoitin.Toista(Leike(m3, "idle"), haivytys);
            var anim = e.Malli.Glb.Animaatio(e.Sekoitin.Nykyinen);
            float kesto = anim?.Kesto ?? 0f;
            // Askelsykli on mitattu skaalaamattomasta mallista (hahmo_skin.py), mutta hahmo piirretään Skin.Skaala-koossa:
            // ilman skaalaa askel oli ~5 % siirtymää lyhyempi ja jalat liukuivat (Linnanrakentaja 5.10.).
            double sykliM = m3?.KavelySykliM > 0 ? m3.KavelySykliM * (m3.Skaala > 0 ? m3.Skaala : 1.0) : 0;
            e.Sekoitin.Nopeus = (tavoite == "kavely" || tavoite == "kanto") && sykliM > 0 && kesto > 0
                ? (float)((e.Hahmo.Reitti?.Nopeus > 0 ? e.Hahmo.Reitti.Nopeus : 1.0) * kesto / sykliM) : 1f;
            float dt = double.IsNaN(e.EdellinenT) ? (float)(VaiheYksikko(e.HahmoId) * kesto) : (float)Math.Clamp(t - e.EdellinenT, 0, 0.1);
            e.EdellinenT = t;
            e.Sekoitin.Paivita(dt);
            IkPalauta(e);
            PaivitaKasvot(e, t);
            var s = e.Sekoitin;
            for (int i = 0; i < e.SolmuT.Length; i++)
            {
                if (!s.Animoitu[i]) continue;
                var tr = e.SolmuT[i];
                tr.localPosition = new Vector3(s.T[i * 3], s.T[i * 3 + 1], s.T[i * 3 + 2]);
                tr.localRotation = new Quaternion(s.R[i * 4], s.R[i * 4 + 1], s.R[i * 4 + 2], s.R[i * 4 + 3]);
                tr.localScale = new Vector3(s.S[i * 3], s.S[i * 3 + 1], s.S[i * 3 + 2]);
            }
            PaivitaSijainti(e, t);
            Ik(e);
            PaaKatse(e, t, e.KuulijaEle != null && e.Sekoitin.Nykyinen == e.KuulijaEle);
        }

        /// <summary>
        /// PÄÄN KATSE (omistaja 5.10. klo 14.4x: "käsieleet ja muu vartalonkäyttö realistiseksi"; Animation Rigging vaatisi Animatorin,
        /// hahmot animoi oma DioraamaSekoitin): animaation jälkeen pää kääntyy kohti keskustelukumppanin päätä (kuulija → puhuja,
        /// puhuja → edellinen puhuja), enintään PaaMaxAsteet, painolla PaaPaino, pehmeästi. Vartalon kääntö on Katse-metodissa.
        /// </summary>
        void PaaKatse(Esiintyma e, double t, bool nyokkaysLeike)
        {
            if (e.PaaIndeksi == -2)
            {
                e.PaaIndeksi = -1;
                for (int i = 0; i < e.SolmuT.Length; i++)
                {
                    string n = e.SolmuT[i].name.ToLowerInvariant();
                    if (n.EndsWith("head") || n == "head" || n.EndsWith(":head") || n.EndsWith("_head")) { e.PaaIndeksi = i; break; }
                }
            }
            if (e.PaaIndeksi < 0) return;
            string kohde = KatseenKohde(e);
            Quaternion tavoite = Quaternion.identity;
            var paa = e.SolmuT[e.PaaIndeksi];
            if (kohde != null && e.Hahmo.Reitti == null)
                foreach (var m in esiintymat)
                    if (kohde == KameraKohde ? m == e && LepoKameraSuunta.HasValue
                        : m != e && m.TilaId == e.TilaId && m.HahmoId == kohde && m.Juuri != null && m.Nakyvissa)
                    {
                        // Kameraan katsova puhuja (ei paikallaan olevaa kuulijaa): pää kohti kameraa, pystykulma rajattuna kuten muuten.
                        var kohdePaa = kohde == KameraKohde ? paa.position + (LepoKameraSuunta ?? Vector3.forward) * 5f
                            : m.PaaIndeksi >= 0 ? m.SolmuT[m.PaaIndeksi].position : m.Juuri.transform.position + Vector3.up * 1.55f;
                        var eteen = -e.Juuri.transform.forward; // skinnatun mallin kasvot (ks. PaivitaSijainti)
                        var suunta = kohdePaa - paa.position;
                        // Pystykatse enintään PaaPystyAst (Päätoimittaja 5.10.: polvistuva kappalainen kallisti pään taakse
                        // kuin katsoisi kattoon, kun seisova puhuja oli yläpuolella).
                        float vaakaPituus = new Vector2(suunta.x, suunta.z).magnitude, maxY = vaakaPituus * Mathf.Tan(PaaPystyAst * Mathf.Deg2Rad);
                        suunta.y = Mathf.Clamp(suunta.y, -maxY, maxY);
                        if (suunta.sqrMagnitude > 0.01f)
                        {
                            var kierto = Quaternion.FromToRotation(eteen, suunta.normalized);
                            kierto.ToAngleAxis(out float kulma, out Vector3 akseli);
                            if (kulma > 180f) kulma -= 360f;
                            tavoite = Quaternion.AngleAxis(Mathf.Clamp(kulma, -PaaMaxAsteet, PaaMaxAsteet) * PaaPaino, akseli);
                        }
                        break;
                    }
            var eteenM = -e.Juuri.transform.forward;
            var oikea = Vector3.Cross(Vector3.up, eteenM);
            if (EleetPaalla && e.Hahmo.Reitti == null)
            {
                // Idle-mikroliike: hidas pään harhailu (Perlin, oma siemen), keskustelussa pienempänä katseen päällä.
                float paino = kohde == null ? 1f : 0.35f, s0 = Siemen(e) % 1000 * 0.137f;
                float yaw = (Mathf.PerlinNoise(s0, (float)(t * 0.13)) * 2f - 1f) * HarhailuYaw * paino;
                float pitch = (Mathf.PerlinNoise(s0 + 50f, (float)(t * 0.11)) * 2f - 1f) * HarhailuPitch * paino;
                tavoite = Quaternion.AngleAxis(yaw, Vector3.up) * Quaternion.AngleAxis(pitch, oikea) * tavoite;
            }
            e.PaaKierto = Quaternion.Slerp(e.PaaKierto, tavoite, 1f - Mathf.Exp(-4f * Time.unscaledDeltaTime));
            paa.rotation = e.PaaKierto * paa.rotation;
            // Kuulijan nyökkäys päällä (ei leikettä): yksi selvä ja toinen pienempi, NyokkaysS.
            double u = (t - e.NyokkaysAlku) / NyokkaysS;
            if (EleetPaalla && !nyokkaysLeike && u >= 0 && u < 1)
            {
                float ast = u < 0.6 ? NyokkaysAst * Mathf.Sin((float)(Math.PI * u / 0.6)) : NyokkaysAst * 0.45f * Mathf.Sin((float)(Math.PI * (u - 0.6) / 0.4));
                paa.rotation = Quaternion.AngleAxis(ast, oikea) * paa.rotation;
            }
        }
        const float PaaMaxAsteet = 40f, PaaPaino = 0.7f, PaaPystyAst = 12f;

        /// <summary>Kasvosuunta keskustelussa: kuulija → puhuja, puhuja → edellinen puhuja; rajattu ja pehmennetty.</summary>
        Vector3 Katse(Esiintyma e, Vector3 paikka, Vector3 oma)
        {
            string kohde = KatseenKohde(e);
            float tavoite = 0f;
            if (kohde == KameraKohde && LepoKameraSuunta is Vector3 lk)
            {
                var suunta = lk; suunta.y = 0f;
                if (suunta.sqrMagnitude > 0.04f) tavoite = Mathf.Clamp(Vector3.SignedAngle(oma, suunta, Vector3.up), -PuhujanMaxKatse, PuhujanMaxKatse);
            }
            else if (kohde != null)
                foreach (var m in esiintymat)
                    if (m != e && m.TilaId == e.TilaId && m.HahmoId == kohde && m.Juuri != null && m.Nakyvissa)
                    {
                        var suunta = m.Juuri.transform.position - paikka; suunta.y = 0f;
                        float raja = EleetPaalla && e.HahmoId == Puhuja ? PuhujanMaxKatse : MaxKatseAsteet;
                        if (suunta.sqrMagnitude > 0.04f) tavoite = Mathf.Clamp(Vector3.SignedAngle(oma, suunta, Vector3.up), -raja, raja);
                        break;
                    }
            // Puhujan kasvot enintään PuhujaKameraAst kameran suunnasta (iPhone 7.10. 07.48: kokki kääntyi kuulijaan seinän puolelle ja
            // puolilähikuva jäi selän taakse, koska kamera pysyy poikkileikkauksen avoimella puolella).
            if (EleetPaalla && e.HahmoId == Puhuja && kohde != null && LepoKameraSuunta is Vector3 kdv)
            {
                var kd = kdv; kd.y = 0f;
                if (kd.sqrMagnitude > 0.04f)
                {
                    var halu = Quaternion.AngleAxis(tavoite, Vector3.up) * oma;
                    float k = Mathf.Clamp(Vector3.SignedAngle(kd, halu, Vector3.up), -PuhujaKameraAst, PuhujaKameraAst);
                    var raj = Quaternion.AngleAxis(k, Vector3.up) * kd;
                    tavoite = Mathf.Clamp(Vector3.SignedAngle(oma, raj, Vector3.up), -PuhujanMaxKatse, PuhujanMaxKatse);
                }
            }
            e.KatseKulma = Mathf.MoveTowards(e.KatseKulma, tavoite, KatseNopeus * Time.unscaledDeltaTime);
            return Quaternion.AngleAxis(e.KatseKulma, Vector3.up) * oma;
        }

        static string Leike(SkinMalli m3, string silmukka)
            => m3?.Leikkeet != null && m3.Leikkeet.TryGetValue(silmukka, out var l) && !string.IsNullOrEmpty(l) ? l : silmukka;

        const float HaivytysS = 0.25f, PuheHaivytysS = 0.45f;

        /// <summary>Juuri-GameObjectin paikka (hahmon oma tai reitti + juuren pystynousu) ja kasvot (Suunta tai
        /// kulkusuunta) -- eriytetty Paivita():sta, jotta se voi ajaa myös liikedatattoman puuttumistilanteen.</summary>
        void PaivitaSijainti(Esiintyma e, double t, double juuriNousuM = 0)
        {
            V3 paikkaKanoninen; Vector3 kasvot;
            if (e.Hahmo.Reitti != null) (paikkaKanoninen, kasvot, _) = ReittiPaikkaJaSuunta(e, t);
            else { paikkaKanoninen = e.Hahmo.Paikka; kasvot = SuunnastaKasvot(e.Hahmo.Suunta); }

            // SKIN (omistaja 20.1x "kuin moon walkia"): glTF-mallin kasvot ovat +Z (Linnanrakentajan mittaus: varvas
            // (0, 0, +0,16), tukijalka liukuu −Z:aan), ja DioraamaGlb:n z-peilaus kääntää ne Unityssä −Z:ksi. LookRotation
            // vie paikallisen +Z:n kasvosuuntaan, joten skinnatulle hahmolle käytetään vastavektoria. Nivelhahmot ennallaan.
            if (e.Sekoitin != null) kasvot = -kasvot;
            Vector3 paikka = DioraamaNayttamo.UnityPiste(paikkaKanoninen);
            paikka.y += (float)juuriNousuM;
            e.Juuri.transform.position = paikka;
            if (e.Hahmo.Reitti == null && e.Sekoitin != null) kasvot = Katse(e, paikka, kasvot);
            if (kasvot.sqrMagnitude > 1e-8f) e.Juuri.transform.rotation = Quaternion.LookRotation(kasvot, Vector3.up);
            if (PuhujanTila != null && e.TilaId == PuhujanTila && e.Juuri != null)
            {
                var fk = e.Juuri.transform.forward; TilanHahmot.Add((e.HahmoId, paikka, e.Sekoitin != null ? -fk : fk));
            }
            if (Puhuja != null && e.HahmoId == Puhuja && e.TilaId == PuhujanTila)
            {
                PuhujanPaa = paikka + Vector3.up * 2.1f; PuhujanJuuri = paikka;
                var f = e.Juuri.transform.forward; PuhujanKasvot = e.Sekoitin != null ? -f : f;   // skinnattu malli katsoo −Z:aan
            }
        }

        /// <summary>Nivelen (rx,ry,rz) [asteina, JS:n THREE 'XYZ'] -> Unity-paikallinen kvaternio peilattuna.
        /// KORJATTU 29.9. (katselmointi): THREE 'XYZ' on matriisina Rx·Ry·Rz (Rz sovelletaan vektoriin ensin).
        /// z-peilaus S = diag(1,1,−1) antaa S·Rx(a)·Ry(b)·Rz(c)·S = Rx(−a)·Ry(−b)·Rz(c), ja Unityn * soveltaa
        /// oikeanpuoleisen ensin, joten tulon järjestys on sama kuin matriisissa: Rx(−rx)·Ry(−ry)·Rz(rz).
        /// (Aiempi Rz·Ry·Rx oli käänteinen: näkyi, kun nivelellä on kaksi akselia yhtä aikaa, esim. olka_o työssä.)</summary>
        static Quaternion NivelKierto(double rx, double ry, double rz) =>
            Quaternion.AngleAxis((float)-rx, Vector3.right)
          * Quaternion.AngleAxis((float)-ry, Vector3.up)
          * Quaternion.AngleAxis((float)rz, Vector3.forward);

        /// <summary>Kompassisuunta (asteina, sama sopimus kuin tools/dioraama/reseptit.mjs:n "suunta" ja
        /// Kameraliike.AsentoSijainti: kanoninen suuntavektori (sin,0,−cos)) -> Unity-suuntavektori. EI erillistä
        /// etumerkkipäättelyä -- lasketaan suoraan kanonisessa tilassa ja PEILATAAN DioraamaNayttamo.UnityPiste-
        /// funktiolla (lineaarinen, siis pätee myös suuntavektorille, ei vain pisteelle).</summary>
        static Vector3 SuunnastaKasvot(double suuntaAsteina)
        {
            double s = suuntaAsteina * RAD;
            V3 suuntaKanoninen = new V3(Math.Sin(s), 0, -Math.Cos(s));
            return DioraamaNayttamo.UnityPiste(suuntaKanoninen);
        }

        // --- reittihahmon paikka ja kulkusuunta (SAMA reittilogiikka kuin DioraamaHahmot.cs, tilapäinen
        // poikkeama sielläkin: Ydin ei laske reittihahmon paikkaa, ks. sen tiedoston alkukommentti) ------------

        void ValmisteleReitti(Esiintyma e, Reitti reitti)
        {
            int n = reitti.Pisteet?.Count ?? 0;
            e.Kumulatiivinen = new double[Math.Max(1, n)];
            double summa = 0;
            for (int i = 1; i < n; i++) { summa += (reitti.Pisteet[i] - reitti.Pisteet[i - 1]).Pituus; e.Kumulatiivinen[i] = summa; }
            e.ReitinMatka = summa;
            double nopeus = reitti.Nopeus > 0 ? reitti.Nopeus : 1.0;
            e.ReitinKulkuS = summa / nopeus;
            e.ReitinVaihe = VaiheYksikko(e.HahmoId + ":reitti"); // eri suola kuin animaatiovaihe (ei korreloi).
        }

        /// <summary>Edestakainen kulku reitin pisteiden välillä vakionopeudella, tauko päissä (SAMA kaava kuin
        /// DioraamaHahmot.ReittiPaikka) + kulkusuunta (kohta 4 "kasvot kulkusuuntaan"): merkki +1 menomatkalla
        /// JA sen päätepysähdyksellä (juuri saavuttu, kasvot yhä menosuuntaan), −1 paluumatkalla JA LÄHTÖPISTEEN
        /// pysähdyksellä (juuri palattu paluusuunnasta) -- pysähdyksissä matka on VAKIO (0 tai ReitinMatka), joten
        /// segmentinhaku antaa aina saman segmentin kuin sen suunnan viimeinen askel.</summary>
        static (V3 paikka, Vector3 suunta, double kavely) ReittiPaikkaJaSuunta(Esiintyma e, double t)
        {
            var reitti = e.Hahmo.Reitti;
            var pisteet = reitti.Pisteet;
            if (pisteet == null || pisteet.Count == 0) return (e.Hahmo.Paikka, Vector3.zero, 0);
            if (pisteet.Count == 1 || e.ReitinMatka <= 0) return (pisteet[0], Vector3.zero, 0);

            double tauko = Math.Max(0, reitti.Tauko);
            double kierto = 2 * e.ReitinKulkuS + 2 * tauko;
            if (kierto <= 0) return (pisteet[0], Vector3.zero, 0);
            double vaihe = Mod(t + e.ReitinVaihe * kierto, kierto);
            double nopeus = reitti.Nopeus > 0 ? reitti.Nopeus : 1.0;
            double matka; int merkki;
            if (vaihe < e.ReitinKulkuS) { matka = vaihe * nopeus; merkki = 1; }
            else if (vaihe < e.ReitinKulkuS + tauko) { matka = e.ReitinMatka; merkki = 1; }
            else if (vaihe < 2 * e.ReitinKulkuS + tauko) { matka = e.ReitinMatka - (vaihe - e.ReitinKulkuS - tauko) * nopeus; merkki = -1; }
            else { matka = 0; merkki = -1; }
            // Tauolla: aika tauon alusta (−1 = liikkeellä). Kävelypaino laskee 0,25 s:ssa idleen ja nousee tauon
            // viimeisellä 0,25 s:lla takaisin; kasvot kääntyvät 180° tauon alussa 0,6 s:ssa (ennen: napsahdus heti).
            double taukoaika = vaihe >= e.ReitinKulkuS && vaihe < e.ReitinKulkuS + tauko ? vaihe - e.ReitinKulkuS
                : vaihe >= 2 * e.ReitinKulkuS + tauko ? vaihe - 2 * e.ReitinKulkuS - tauko : -1;
            double kavely = taukoaika < 0 ? 1
                : Math.Max(1 - Math.Clamp(taukoaika / SiirtymaS, 0, 1), Math.Clamp((taukoaika - (tauko - SiirtymaS)) / SiirtymaS, 0, 1));

            int seg = 0;
            while (seg < e.Kumulatiivinen.Length - 2 && e.Kumulatiivinen[seg + 1] < matka) seg++;
            int segSeur = Math.Min(seg + 1, pisteet.Count - 1);
            double segAlku = e.Kumulatiivinen[seg], segLoppu = e.Kumulatiivinen[Math.Min(seg + 1, e.Kumulatiivinen.Length - 1)];
            double osuus = segLoppu > segAlku ? Math.Clamp((matka - segAlku) / (segLoppu - segAlku), 0.0, 1.0) : 0;
            V3 piste = V3.Lerp(pisteet[seg], pisteet[segSeur], osuus);
            V3 segSuunta = (pisteet[segSeur] - pisteet[seg]) * merkki;
            Vector3 suunta = DioraamaNayttamo.UnityPiste(segSuunta);
            if (taukoaika >= 0)
            {
                float k = Mathf.SmoothStep(0f, 1f, (float)Math.Clamp(taukoaika / KaannosS, 0, 1));
                suunta = Quaternion.AngleAxis(180f * k, Vector3.up) * suunta;
            }
            return (piste, suunta, kavely);
        }

        /// <summary>Kävelysilmukan luonnollinen nopeus (1 s = 2 askelta, lonkka ±25° → askel ~0,72 m, Linnanrakentaja 30.9.).</summary>
        const double KavelyNopeus = 1.4;
        /// <summary>Kävely ↔ idle -siirtymä tauon päissä ja kasvojen 180° käännöksen kesto (Linnanrakentaja 30.9.).</summary>
        const double SiirtymaS = 0.25, KaannosS = 0.6;

        static double Mod(double a, double m) => a - m * Math.Floor(a / m);

        /// <summary>Deterministinen 0..1-vaihe merkkijonosta (FNV-1a) -- SAMA kaava kuin DioraamaHahmot.
        /// VaiheYksikko (kopioitu, ei jaettu: eri tiedosto, ei riippuvuutta).</summary>
        static double VaiheYksikko(string id)
        {
            if (string.IsNullOrEmpty(id)) return 0;
            uint h = 2166136261;
            foreach (char c in id) { h ^= c; h *= 16777619; }
            return (h % 1000) / 1000.0;
        }

        /// <summary>Testikomento "poikki skin valkoinen|kuva|tila": skinnattujen kuvamateriaalien tila ja kärkivärit.</summary>
        public string SkinKoe(string mita)
        {
            int materiaaleja = 0, karkia = 0, varillisia = 0; float aoMin = 1f;
            foreach (var hm in malliCache.Values)
            {
                if (hm.SkinSolmut == null) continue;
                foreach (var sm in hm.SkinSolmut)
                {
                    if (sm?.Mesh == null) continue;
                    karkia += sm.Mesh.vertexCount;
                    if (sm.Mesh.HasVertexAttribute(UnityEngine.Rendering.VertexAttribute.Color))
                    {
                        varillisia += sm.Mesh.vertexCount;
                        foreach (var c in sm.Mesh.colors32) aoMin = Mathf.Min(aoMin, c.r / 255f);
                    }
                    foreach (var m in sm.Materiaalit)
                    {
                        if (m == null || !m.name.StartsWith("Hahmo3D/kuva:", StringComparison.Ordinal)) continue;
                        materiaaleja++;
                        if (mita == "valkoinen") { m.SetFloat(IdTila, 0f); m.SetColor(IdVari, Color.white); }
                        else if (mita == "kuva") m.SetFloat(IdTila, m.GetTexture(IdPohjaKuva) != null ? 1f : 0f);
                    }
                }
            }
            // Testisäädöt (juurisyy 2.10. 21.0x): varjokoe (punainen, täysi, syvyystesti pois), varjo (oletus), veto=m,
            // peitto=0–1, ztest=always|lequal, vari=punainen|varjo.
            if (varjoMateriaali != null && mita != null)
            {
                var v = varjoMateriaali.GetColor("_VarjoVari");
                var kv = mita.Split('=');
                float.TryParse(kv.Length > 1 ? kv[1] : "", System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var luku);
                bool muutettu = true;
                switch (kv[0])
                {
                    case "varjokoe": v = new Color(1f, 0f, 0f, 1f); varjoMateriaali.SetFloat("_ZTest", (float)UnityEngine.Rendering.CompareFunction.Always); break;
                    case "varjo": v = VarjoVari; varjoMateriaali.SetFloat("_ZTest", (float)UnityEngine.Rendering.CompareFunction.LessEqual); varjoMateriaali.SetFloat("_VarjoVeto", 0.4f); break;
                    case "veto": varjoMateriaali.SetFloat("_VarjoVeto", luku); break;
                    case "peitto": v = new Color(1f - luku * (1f - VarjoVari.r), 1f - luku * (1f - VarjoVari.g), 1f - luku * (1f - VarjoVari.b), 1f); break;
                    case "ztest": varjoMateriaali.SetFloat("_ZTest", (float)(kv.Length > 1 && kv[1] == "always" ? UnityEngine.Rendering.CompareFunction.Always : UnityEngine.Rendering.CompareFunction.LessEqual)); break;
                    case "vari": v = kv.Length > 1 && kv[1] == "punainen" ? new Color(1f, 0f, 0f, v.a) : new Color(VarjoVari.r, VarjoVari.g, VarjoVari.b, v.a); break;
                    case "rgba":
                        var o = kv.Length > 1 ? kv[1].Split(',') : new string[0];
                        if (o.Length == 4) v = new Color(F(o[0]), F(o[1]), F(o[2]), F(o[3]));
                        break;
                    case "sekoitus":
                        // kerto = DstColor Zero, alfa = SrcAlpha OneMinusSrcAlpha, peite = One Zero
                        var (l, k) = kv.Length > 1 && kv[1] == "alfa" ? (UnityEngine.Rendering.BlendMode.SrcAlpha, UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha)
                            : kv.Length > 1 && kv[1] == "peite" ? (UnityEngine.Rendering.BlendMode.One, UnityEngine.Rendering.BlendMode.Zero)
                            : (UnityEngine.Rendering.BlendMode.DstColor, UnityEngine.Rendering.BlendMode.Zero);
                        varjoMateriaali.SetFloat("_Lahde", (float)l); varjoMateriaali.SetFloat("_Kohde", (float)k);
                        break;
                    default: muutettu = false; break;
                }
                varjoMateriaali.SetColor("_VarjoVari", v);
                if (muutettu && mita.Contains("="))
                    return $"varjo: vari {v}, ztest {varjoMateriaali.GetFloat("_ZTest")}, veto {varjoMateriaali.GetFloat("_VarjoVeto"):F2}, "
                        + $"sekoitus {varjoMateriaali.GetFloat("_Lahde")}/{varjoMateriaali.GetFloat("_Kohde")}";
            }
            int varjoja = 0; string varjoY = "";
            foreach (var e in esiintymat)
            {
                var v = e.Juuri != null ? e.Juuri.transform.Find("Kontaktivarjo") : null;
                if (v == null) continue;
                varjoja++;
                if (e.TilaId == "muurinharja" || varjoY.Length < 40)
                    varjoY += $" {e.TilaId}/{e.HahmoId}:{v.position.y:F2}({(v.gameObject.activeInHierarchy ? "päällä" : "pois")}, juuri {e.Juuri.transform.lossyScale.x:F2})";
            }
            return $"{mita}: {materiaaleja} kuvamateriaalia, kärkiä {karkia}, värillisiä {varillisia}, AO min {aoMin:F2}; "
                + $"kontaktivarjoja {varjoja}/{esiintymat.Count} (materiaali {(varjoMateriaali != null ? "ok" : "PUUTTUU")}, y{varjoY})";
        }

        static float F(string s) => float.TryParse(s, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var f) ? f : 0f;

        static long MeshKolmiot(Mesh m) { long n = 0; for (int i = 0; i < m.subMeshCount; i++) n += m.GetIndexCount(i) / 3; return n; }

        public void Tyhjenna()
        {
            foreach (var e in esiintymat) if (e.Juuri != null) UnityEngine.Object.Destroy(e.Juuri);
            esiintymat.Clear();
            foreach (var hm in malliCache.Values)
            {
                foreach (var lista in new[] { hm.Solmut, hm.SkinSolmut })
                    if (lista != null)
                        foreach (var sm in lista)
                        {
                            if (sm?.Mesh != null) UnityEngine.Object.Destroy(sm.Mesh);
                            if (sm?.Materiaalit != null) foreach (var m in sm.Materiaalit) if (m != null) UnityEngine.Object.Destroy(m);
                        }
                foreach (var tex in hm.Tekstuurit) if (tex != null) UnityEngine.Object.Destroy(tex);
            }
            malliCache.Clear();
            nakymaHaku.Clear();
        }

        /// <summary>Lineaarinen -> sRGB (glb.mjs:n srgbLineaariksi-funktion KÄÄNTEISFUNKTIO). GlbOsa.Vari on
        /// JO lineaarinen (glTF-spec, ks. DioraamaGlb.cs:n GlbOsa.Vari-kommentti), mutta Material.SetColor
        /// tälle _Vari-propertylle OLETTAA sRGB:n ja linearisoi sen ITSE (lineaarinen väriavaruus — ks.
        /// DioraamaRakennus.cs:n MateriaaliPinnalle-kommentti: "SetColor muuntaa sRGB:n lineaariseksi itse")
        /// — ilman tätä käännöstä väri linearisoituisi KAHDESTI ja näkyisi liian tummana.</summary>
        static float LinearistaSrgbiksi(float c)
        {
            c = Mathf.Clamp01(c);
            return c <= 0.0031308f ? c * 12.92f : 1.055f * Mathf.Pow(c, 1f / 2.4f) - 0.055f;
        }
    }
}
