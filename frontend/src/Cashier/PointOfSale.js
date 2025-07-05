import { useEffect, useState } from 'react';
import CashierProtect from './../CashierProtect';
import {
    readCashierProduct,
    createOrder,
    readCashierIdProduct,
    readCashierCategory,
    readCashierPayment,
    readCashierMember
} from '../axios';
import styles from '../css/PointOfSale.module.css'
import IconPos_P from './../images/IconPos-P.svg'
import IconHistory_W from './../images/IconHistory-W.svg'
import Iconlogout_W from './../images/IconLogout-W.svg'
import LogoKasirKu from '../images/LogoKasirKu.svg'
import CashierProfile from '../images/CashierProfile.svg'
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import IconCart from '../images/IconCart.svg'

function PointOfSale() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [cart, setCart] = useState([])
    const [payment, setPayment] = useState([])
    const [member, setMember] = useState([])
    const [form, setForm] = useState({
        customer_name: "",
        id_payment: "",
        id_member: "",
        pembayaran: ""
    })
    const [popup, setPopup] = useState(false)
    const [orderDetail, setOrderDetail] = useState(false)
    const [orderConfirmed, setOrderConfirmed] = useState(false)
    const [hitungTotalHarga, setHitungTotalHarga] = useState(0)
    const [paymenLink, setPaymentLink] = useState(false)

    const handleNumpad = (value) => {
        if (value === "C") {
            setForm({ ...form, pembayaran: "" });
        } else if (value === "Hapus") {
            setForm({ ...form, pembayaran: form.pembayaran.slice(0, -1) });
        } else {
            setForm({ ...form, pembayaran: (form.pembayaran || "") + value });
        }
    };

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('user')
        window.location.href = '/'
    }

    const viewproduct = async () => {
        const datacashierproduct = await readCashierProduct()
        setProduct(datacashierproduct.data.Data)
    }

    const viewCategory = async () => {
        const datacashiercategory = await readCashierCategory()
        setCategories(datacashiercategory.data.Data)
    }

    const viewDropdownOrder = async () => {
        const datapayment = await readCashierPayment()
        const datamember = await readCashierMember()
        setPayment(datapayment.data.Data)
        setMember(datamember.data.Data)
    }

    useEffect(() => {
        viewproduct()
        viewCategory()
        viewDropdownOrder()
    }, [])

    const calculateTotal = () => {
        const hargaAwal = cart.reduce((acc, item) => acc + item.harga * item.quantity, 0)
        const diskon = form.id_member ? hargaAwal * 0.05 : 0
        return hargaAwal - diskon
    }

    const handleBtnAllCategory = async () => {
        setActiveCategory(null)
        const datacashierproduct = await readCashierProduct()
        setProduct(datacashierproduct.data.Data)
    }

    const handleBtnIdCategory = async (id) => {
        try {
            setActiveCategory(id)
            const dataidcashiercategory = await readCashierIdProduct(id)
            setProduct(dataidcashiercategory.data.JSON)
        } catch (error) {
            console.log(error)
            toast.error('Gagal mengambil ID Product', {
                style: {
                    fontSize: '13px',
                    backgroundColor: '#fff0f0',
                    color: '#d00',
                },
            });
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCart = async (id) => {
        const itemProduct = product.find((item) => item.id === id)
        const cekItem = cart.find((item) => item.id === id)
        if (cekItem) {
            setCart(cart.map((item) => (
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )))
        } else {
            setCart([
                ...cart, {
                    id: id,
                    nama: itemProduct.supplier.nama_produk,
                    harga: itemProduct.harga_produk,
                    image: itemProduct.image,
                    quantity: 1,
                }
            ])
        }
    }

    const handleQuantity = (id, quantityChange) => {
        setCart(cart => {
            return cart
                .map(item => {
                    if (item.id === id) {
                        const newQuantity = item.quantity + quantityChange;
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0);
        });
    };

    const handleRemoveAll = () => {
        setForm({
            customer_name: "",
            id_payment: "",
            id_member: "",
            pembayaran: ""
        })
        setCart([])
    }

    const handleOrder = async () => {
        if (!form.customer_name || !form.id_payment) {
            toast.warning('Customer Name dan Payment Method wajib diisi!', {
                style: {
                    fontSize: '12px',
                    backgroundColor: '#fffbe6',
                    color: '#a97b00',
                },
            });
            return;
        }

        if (cart.length === 0) {
            toast.warning('Keranjang masih kosong!', {
                style: {
                    fontSize: '12px',
                    backgroundColor: '#fffbe6',
                    color: '#a97b00',
                },
            });
            return;
        }

        setPopup(true)
        setOrderConfirmed(false)
        if (form.id_payment === "2") {
            const payload = {
                customer_name: form.customer_name,
                id_payment: parseInt(form.id_payment),
                id_member: form.id_member ? parseInt(form.id_member) : null,
                pembayaran: null,
                array: cart.map(item => ({
                    id_product: item.id,
                    quantity: item.quantity
                }))
            }
            try {
                const datacart = await createOrder(payload)
                const data = datacart.data
                setOrderDetail({
                    ...data.order,
                    total_harga: data.order.total_harga || calculateTotal()
                })
                setPaymentLink(data.order?.payment_link || data.payment_link || null)
                setOrderConfirmed(true)
                toast.success('Berhasil membuat Order!', {
                    style: {
                        fontSize: '12px',
                        backgroundColor: '#f0fff0',
                        color: '#0a0',
                    },
                });
            } catch (err) {
                console.error(err)
                toast.error('Gagal membuat Order!', {
                    style: {
                        fontSize: '12px',
                        backgroundColor: '#fff0f0',
                        color: '#d00',
                    },
                });
                return;
            }
        }
    }

    const proceedOrder = async () => {
        if (form.id_payment === "1") {
            if (parseInt(form.pembayaran) < calculateTotal()) {
                toast.warning('Nomimal pembayaran tidak mencukupi!', {
                    style: {
                        fontSize: '12px',
                        backgroundColor: '#fffbe6',
                        color: '#a97b00',
                    },
                });
                return
            }
            const payload = {
                customer_name: form.customer_name,
                id_payment: parseInt(form.id_payment),
                id_member: form.id_member ? parseInt(form.id_member) : null,
                pembayaran: parseInt(form.pembayaran),
                array: cart.map(item => ({
                    id_product: item.id,
                    quantity: item.quantity
                }))
            }

            try {
                await createOrder(payload)
                toast.success('Berhasil membuat Order!', {
                    style: {
                        fontSize: '12px',
                        backgroundColor: '#f0fff0',
                        color: '#0a0',
                    },
                });
                setTimeout(() => window.location.reload(), 3000);
            } catch (err) {
                console.error(err)
                toast.error('Gagal membuat Order!', {
                    style: {
                        fontSize: '12px',
                        backgroundColor: '#fff0f0',
                        color: '#d00',
                    },
                });
            }
        } else {
            window.location.reload()
        }
    }

    const totalHarga = cart.reduce((acc, item) => acc + item.harga * item.quantity, 0)

    return (
        <div>
            <Helmet>
                <title>Pos Menu</title>
            </Helmet>
            <CashierProtect>
                <ToastContainer position="top-right" autoClose={3000} newestOnTop={true} />
                <div className={styles.container}>
                    <div className={styles["container-left"]}>
                        <div className={styles["float-sidebar"]}>
                            <a href='/poscashier' className={styles.icon1}>
                                <img src={IconPos_P} alt='icon-pos' />
                            </a>
                            <a href='/' className={styles.icon3}>
                                <img src={Iconlogout_W} alt='icon-logout' onClick={logout} />
                            </a>
                        </div>
                    </div>
                    <div className={styles["container-middle"]}>
                        <div className={styles["container-middle-top"]}>
                            <div className={styles.logo}>
                                <img src={LogoKasirKu} width={35} />
                                <div className={styles["logo-font"]}>
                                    <p>Kasirku</p>
                                    <p>Pos</p>
                                </div>
                            </div>
                            <div className={styles.cashierprofile}>
                                <img src={CashierProfile} alt='cashier-profile' />
                                <div className={styles.cashierprofilep}>
                                    <p>{user.name} </p>
                                    <p>{user.role}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles["container-middle-bottom"]}>
                            <div className={styles.content1}>
                                <p className={styles.gcp}>Goods Catalog</p>
                                <div className={styles["input-search"]}>
                                    <form>
                                        <input type='text' name='search' placeholder='Search your product. . .' className={styles.searchbar} />
                                    </form>
                                </div>
                            </div>
                            <div className={styles.content2}>
                                <div className={styles.scrollcontent2}>
                                    <button onClick={handleBtnAllCategory} className={`{styles.all} ${activeCategory === null ? styles.activeCategory : ""}`}>All</button>
                                    {categories.map((item) => (
                                        <div key={item.id}>
                                            <button onClick={() => handleBtnIdCategory(item.id)} className={activeCategory === item.id ? styles.activeCategory : ''}>{item.nama_category}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.content3}>
                                {product.map((item) => (
                                    <div key={item.id} className={styles["content-box"]}>
                                        <img src={`http://127.0.0.1:8000/images/${item.image}`} alt={item.image} width={100} />
                                        <p className={styles.namaproduk}>{item.supplier.nama_produk}</p>
                                        <p className={styles.hargaproduk}>Rp. {item.harga_produk}</p>
                                        <button className={styles.btnCart} onClick={(() => handleCart(item.id))}>+</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles["container-right"]}>
                        <div className={styles["container-pos"]}>
                            <div className={styles["pos-top"]}>
                                <div className={styles.carttitle}>
                                    <img src={IconCart} alt='icon-cart' width={20} />
                                    <p>Order Summary</p>
                                </div>
                                <button onClick={handleRemoveAll} className={styles["remove-all"]}>Remove All</button>
                            </div>
                            <div className={styles["pos-content"]}>
                                <label htmlFor='customer_name'>Customer Name<span className={styles.star}>*</span></label>
                                <input
                                    type='text'
                                    id='customer_name'
                                    name='customer_name'
                                    placeholder='Customer Name'
                                    onChange={handleChange}
                                    value={form.customer_name}
                                />
                                <label htmlFor='id_payment'>Payment Method<span className={styles.star}>*</span></label>
                                <select name="id_payment" value={form.id_payment} onChange={handleChange} className={styles.selectForm}>
                                    <option value="">Pilih</option>
                                    {payment.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nama_payment}</option>
                                    ))}
                                </select>
                                <label htmlFor='id_member'>Member Number</label>
                                <select name="id_member" value={form.id_member} onChange={handleChange} className={styles.selectForm}>
                                    <option value="">Pilih</option>
                                    {member.map((item) => (
                                        <option key={item.id} value={item.id}>{item.no_telpon}</option>
                                    ))}
                                </select>
                                <label htmlFor='order-detail'>Order Detail</label>
                                <div className={styles.bgcart}>
                                    {cart.length > 0 ? (
                                        <div className={styles.cart_management}>
                                            {cart.map((item) => (
                                                <div key={item.id} className={styles.thecart}>
                                                    <img src={`http://127.0.0.1:8000/images/${item.image}`} alt={item.image} />
                                                    <div className={styles.thecartp}>
                                                        <p>{item.nama}</p>
                                                        <p>{item.harga}</p>
                                                    </div>
                                                    <div className={styles.thecartq}>
                                                        <button onClick={() => handleQuantity(item.id, 1)}>+</button>
                                                        <p className={styles.box_quantity}>{item.quantity}</p>
                                                        <button onClick={() => handleQuantity(item.id, -1)}>-</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <p className={styles.emptycart}>Empty Cart!</p>}
                                </div>
                                <p className={styles.total_harga}>Total<span> : Rp{totalHarga}</span></p>
                                <button onClick={handleOrder} className={styles.btnOrder}>Order</button>

                            </div>
                        </div>
                    </div>
                    {popup && (
                        <div className={styles.overlay_popup_payment}>
                            <div className={styles.popup_payment}>
                                <div className={styles.toppopup}>
                                    <p>Payment</p>
                                    <a href='/poscashier'>&times;</a>
                                </div>
                                <div className={styles.customer_info}>
                                    <p className={styles.lci}>Customer Info</p>
                                    <div className={styles.ci}>
                                        <p className={styles.bgp}>{form.customer_name.charAt(0).toUpperCase()}</p>
                                        <div className={styles.nama_cust}>
                                            <p>{form.customer_name}</p>
                                            <p>{form.id_member && member.find(item => item.id == form.id_member) ? 'Member' : 'Customer'}</p>
                                        </div>
                                    </div>
                                </div>
                                {form.id_payment == "1" && (
                                    <>
                                        <div className={styles.cart_popup1}>
                                            <p className={styles.tdl}>Transaction Detail</p>
                                            <div className={styles.pubah}>
                                                {cart.map((item, index) => (
                                                    <div key={item.id} className={styles.item_popup}>
                                                        <div className={styles.orderd}>
                                                            <p>{++index}. {item.nama}</p>
                                                            <p>Rp{item.harga}</p>
                                                        </div>
                                                        <p>{item.quantity}x</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.alltotal1}>
                                            <p>Subtotal<span className={styles.thp1}>: Rp{totalHarga}</span></p>
                                            <p>Total<span className={styles.thps1}>: Rp{calculateTotal()}</span></p>
                                        </div>
                                        <input type='number' name='pembayaran' value={form.pembayaran} onChange={handleChange} placeholder='Rp.' className={styles.pembayaran} />
                                        <div className={styles.numpad}>
                                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "Hapus"].map((btn) => (
                                                <button
                                                    key={btn}
                                                    className={styles.numpadBtn}
                                                    onClick={() => handleNumpad(btn)}
                                                >
                                                    {btn}
                                                </button>
                                            ))}
                                        </div>
                                        <button className={styles.btnProceed1} onClick={proceedOrder}>Proceed</button>
                                    </>
                                )}
                                {orderConfirmed && orderDetail && orderDetail.id_payment === 2 && paymenLink && (
                                    <><div className={styles.cart_popup}>
                                        <p className={styles.tdl}>Transaction Detail</p>
                                        <div className={styles.pubah}>
                                            {cart.map((item, index) => (
                                                <div key={item.id} className={styles.item_popup}>
                                                    <div className={styles.orderd}>
                                                        <p>{++index}. {item.nama}</p>
                                                        <p>Rp{item.harga}</p>
                                                    </div>
                                                    <p>{item.quantity}x</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                        <div className={styles.alltotal}>
                                            <p>Subtotal<span className={styles.thp}>: Rp {totalHarga}</span></p>
                                            <p>Total<span className={styles.thps}>: Rp{orderDetail.total_harga || hitungTotalHarga}</span></p>
                                        </div>
                                        <a href={paymenLink} target='_blank' rel='noopener noreferrer' className={styles.link_pembayaran}>
                                            Payment Link
                                        </a>
                                        <button className={styles.btnProceed2} onClick={proceedOrder}>Proceed</button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CashierProtect>
        </div>
    );
}

export default PointOfSale;
