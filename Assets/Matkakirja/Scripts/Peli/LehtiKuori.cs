// Kaupunkilehti natiivissa WKWebView-kuoressa (osa C, Pelikoodari 23.9.2026).
//
// Toteuttaa ILehti-sopimuksen (Peli/Sopimukset.cs). iOS-laitteella kutsuu
// liitännäistä Plugins/iOS/MatkakirjaLehti.mm; editorissa ja muilla
// alustoilla avaa osoitteen selaimeen (valinnainen) ja sulkee "lehden"
// seuraavassa ruudussa, jotta pelivirta toimii samoin kuin laitteella.
//
// Sulkemisen semantiikka (Suljettu herää täsmälleen kerran per Avaa):
//   - pelaaja sulkee lehden → liitännäinen: UnitySendMessage(
//     "MatkakirjaLehti", "LehtiSuljettu", kaupunki) → LehtiSuljettu → Suljettu;
//   - Sulje() tai uusi Avaa() lehden ollessa auki → Suljettu herätetään tässä
//     heti, ja liitännäinen sulkee näkymän hiljaa (ei viestiä takaisin);
//   - kelvoton kaupunkitunnus → varoitus lokiin ja Suljettu seuraavassa
//     ruudussa (kutsuja ei jää odottamaan lehteä, joka ei aukea).
//
// GameObjectin NIMEN on oltava "MatkakirjaLehti": UnitySendMessage etsii
// vastaanottajan nimellä. Hae() luo olion tarvittaessa.
using System;
using System.Collections;
using System.Runtime.InteropServices;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class LehtiKuori : MonoBehaviour, ILehti
    {
        /// <summary>Sama nimi kuin MatkakirjaLehti.mm:n kUnityOlio.</summary>
        public const string PeliolionNimi = "MatkakirjaLehti";

        [Tooltip("Osoitteen alku; kaupunkitunnus liitetään perään. Oltava https ja päätyttävä ?lehti= tai &lehti=.")]
        [SerializeField] string osoitePohja = LehtiOsoite.OletusPohja;

        [Tooltip("Editorissa ja muilla kuin iOS-alustoilla: avaa lehti järjestelmän selaimeen.")]
#pragma warning disable 0414 // iOS-laitekäännöksessä kenttää ei lueta
        [SerializeField] bool avaaSelaimessaEditorissa = false;
#pragma warning restore 0414

        public event Action<string> Suljettu;
        /// <summary>Sivu ilmoitti lehden olevan auki (latauspeitteen poisto, Natiivi-UI).</summary>
        public event Action<string> Avautui;
        /// <summary>Muut sivun viestit JSONina (tuleva teko-silta: {tapahtuma:'teko', …}).</summary>
        public event Action<string> Viesti;

        /// <summary>Onko lehti Unityn näkökulmasta auki.</summary>
        public bool Auki { get; private set; }

        /// <summary>Auki olevan lehden kaupunki tai null.</summary>
        public string AukiKaupunki { get; private set; }

        public string OsoitePohja
        {
            get => osoitePohja;
            set => osoitePohja = value;
        }

        static LehtiKuori instanssi;

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaLehti_Avaa(string osoite);
        [DllImport("__Internal")] static extern void MatkakirjaLehti_Sulje();
#endif

        /// <summary>Hakee näkymän lehtikuoren tai luo sen (säilyy näkymävaihdoissa).</summary>
        public static LehtiKuori Hae()
        {
            if (instanssi != null) return instanssi;
            var olio = GameObject.Find(PeliolionNimi);
            var kuori = olio != null ? olio.GetComponent<LehtiKuori>() : null;
            if (kuori == null)
            {
                olio = new GameObject(PeliolionNimi);
                kuori = olio.AddComponent<LehtiKuori>();
            }
            return kuori;
        }

        void Awake()
        {
            if (instanssi != null && instanssi != this)
            {
                Debug.LogWarning("[LehtiKuori] toinen lehtikuori poistetaan: " + gameObject.name);
                Destroy(this);
                return;
            }
            instanssi = this;
            if (gameObject.name != PeliolionNimi)
            {
                Debug.LogWarning($"[LehtiKuori] olion nimi '{gameObject.name}' → '{PeliolionNimi}' (UnitySendMessage vaatii)");
                gameObject.name = PeliolionNimi;
            }
            if (transform.parent == null) DontDestroyOnLoad(gameObject);
        }

        void OnDestroy()
        {
            if (instanssi != this) return;
            instanssi = null;
            if (Auki) NatiiviSulje();
            Auki = false;
            AukiKaupunki = null;
        }

        /// <summary>ILehti.Avaa ilman natiivin alkutilaa.</summary>
        public void Avaa(string kaupunki) => Avaa(kaupunki, null);

        /// <summary>Avaa lehden; tilaJson (raha ja kaupat) risuaitaan lehtikuorelle (LehtiOsoite.LisaaTila).</summary>
        public void Avaa(string kaupunki, string tilaJson) => Avaa(kaupunki, tilaJson, null, null);

        /// <summary>
        /// Avaa lehden; maa (ISO3) avaa maalehden aiheen sivulta (sivu = aiheen id)
        /// kaupungin sijaan. Kaupunki on pelin sijainti ja palaa Suljettu-tapahtumassa.
        /// </summary>
        public void Avaa(string kaupunki, string tilaJson, string maa, string sivu)
        {
            if (Auki) Sulje();

            if (!LehtiOsoite.YritaRakentaa(kaupunki, osoitePohja, out var osoite, out var virhe))
            {
                Debug.LogWarning("[LehtiKuori] lehteä ei avata: " + virhe);
                Auki = true;
                AukiKaupunki = kaupunki ?? "";
                SuljeMyohemmin(AukiKaupunki);
                return;
            }

            if (maa != null) osoite = LehtiOsoite.LisaaMaa(osoite, maa, sivu);
            osoite = LehtiOsoite.LisaaTila(osoite, tilaJson);
            Auki = true;
            AukiKaupunki = kaupunki;
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaLehti_Avaa(osoite);
#else
            Debug.Log("[LehtiKuori] (ei iOS-laite) lehti: " + osoite);
            Avautui?.Invoke(kaupunki);
            if (avaaSelaimessaEditorissa) Application.OpenURL(osoite);
            SuljeMyohemmin(kaupunki);
#endif
        }

        /// <summary>Sulkee lehden Unityn aloitteesta; Suljettu herää heti.</summary>
        public void Sulje()
        {
            if (!Auki) return;
            var kaupunki = AukiKaupunki;
            NatiiviSulje();
            Auki = false;
            AukiKaupunki = null;
            Suljettu?.Invoke(kaupunki);
        }

        /// <summary>
        /// Liitännäisen viesti (UnitySendMessage): pelaaja sulki lehden.
        /// Myöhästynyt viesti jo suljetusta tai korvatusta lehdestä ohitetaan.
        /// </summary>
        public void LehtiSuljettu(string kaupunki)
        {
            if (!Auki) return;
            if (!string.IsNullOrEmpty(kaupunki) && !string.IsNullOrEmpty(AukiKaupunki) && kaupunki != AukiKaupunki) return;
            var suljettu = string.IsNullOrEmpty(kaupunki) ? AukiKaupunki : kaupunki;
            Auki = false;
            AukiKaupunki = null;
            Suljettu?.Invoke(suljettu);
        }

        /// <summary>Liitännäisen viesti: sivu on auki ('lehti-auki'), kerran per avaus.</summary>
        public void LehtiAvautui(string kaupunki)
        {
            if (!Auki) return;
            Avautui?.Invoke(string.IsNullOrEmpty(kaupunki) ? AukiKaupunki : kaupunki);
        }

        /// <summary>Liitännäisen viesti: muu sivun viesti JSONina.</summary>
        public void LehtiViesti(string json)
        {
            if (!Auki || string.IsNullOrEmpty(json)) return;
            Viesti?.Invoke(json);
        }

        void SuljeMyohemmin(string kaupunki)
        {
            // Ei-aktiivinen olio ei voi ajaa korutiinia: suljetaan heti.
            if (isActiveAndEnabled) StartCoroutine(SuljeSeuraavassaRuudussa(kaupunki));
            else LehtiSuljettu(kaupunki);
        }

        IEnumerator SuljeSeuraavassaRuudussa(string kaupunki)
        {
            yield return null;
            LehtiSuljettu(kaupunki);
        }

        static void NatiiviSulje()
        {
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaLehti_Sulje();
#endif
        }
    }
}
