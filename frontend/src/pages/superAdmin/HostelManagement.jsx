import React, { useState, useEffect } from 'react';
import {
  Building, ShieldCheck, UserPlus, Key, Plus,
  Mail, Lock, Phone, Trash2, Copy, CheckCircle2, ChefHat, Eye, EyeOff,
  Sparkles, Filter, ChevronRight, Edit3, X, Save, AlertCircle, Search,
  GraduationCap, Utensils, Award
} from 'lucide-react';

const INITIAL_HOSTEL_BLOCKS = [
  { id: 'a1b2c3d4-0000-0000-0000-000000000001', code: 'BH-1', name: 'Aryabhata Boys Hostel (BH-1)', type: 'Boys', capacity: 420, mess_capacity: 180, defaultWarden: 'Prof. R. C. Mohanty', defaultCaterer: 'Rajesh Sharma - Maa Tarini Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000002', code: 'BH-2', name: 'Varahamihira Boys Hostel (BH-2)', type: 'Boys', capacity: 400, mess_capacity: 170, defaultWarden: 'Dr. A. K. Behera', defaultCaterer: 'Maa Tarini Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000003', code: 'BH-3', name: 'Charaka Boys Hostel (BH-3)', type: 'Boys', capacity: 450, mess_capacity: 190, defaultWarden: 'Dr. P. K. Jena', defaultCaterer: 'Sahoo Hospitality' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000004', code: 'BH-4', name: 'Sushruta Boys Hostel (BH-4)', type: 'Boys', capacity: 430, mess_capacity: 185, defaultWarden: 'Dr. M. M. Mishra', defaultCaterer: 'Utkal Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000005', code: 'BH-5', name: 'Bhaskara Boys Hostel (BH-5)', type: 'Boys', capacity: 410, mess_capacity: 175, defaultWarden: 'Prof. S. R. Pattnaik', defaultCaterer: 'Sai Kitchens' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000006', code: 'BH-6', name: 'Brahmagupta Boys Hostel (BH-6)', type: 'Boys', capacity: 450, mess_capacity: 200, defaultWarden: 'Dr. K. C. Tripathy', defaultCaterer: 'Royal Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000007', code: 'BH-7', name: 'BH-7 (Boys Hostel 7)', type: 'Boys', capacity: 450, mess_capacity: 220, defaultWarden: 'Dr. S. K. Mahapatra', defaultCaterer: 'Alok Verma - Royal Dining' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000008', code: 'GH-1', name: 'Gargi Girls Hostel (GH-1)', type: 'Girls', capacity: 480, mess_capacity: 210, defaultWarden: 'Dr. Sunita Nayak', defaultCaterer: 'Priya Food Services' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000009', code: 'GH-2', name: 'Maitreyi Girls Hostel (GH-2)', type: 'Girls', capacity: 460, mess_capacity: 200, defaultWarden: 'Dr. Rashmi Das', defaultCaterer: 'Annapurna Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000010', code: 'GH-3', name: 'Kalpana Chawla Girls Hostel (GH-3)', type: 'Girls', capacity: 500, mess_capacity: 230, defaultWarden: 'Dr. Meenakshi Sahu', defaultCaterer: 'Shree Krishna Mess' },
];

const INITIAL_WARDENS = [
  { id: 'warden-bh1', code: 'BH-1', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Prof. R. C. Mohanty', email: 'warden.bh1@campus.edu', password: 'warden123', phone: '+91 94370 11101', designation: 'Chief Hostel Warden', office: 'BH-1 Ground Floor Office', status: 'Active' },
  { id: 'warden-bh2', code: 'BH-2', hostel_name: 'Varahamihira Boys Hostel (BH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Dr. A. K. Behera', email: 'warden.bh2@campus.edu', password: 'warden123', phone: '+91 94370 22201', designation: 'Associate Warden', office: 'BH-2 Administrative Block', status: 'Active' },
  { id: 'warden-bh3', code: 'BH-3', hostel_name: 'Charaka Boys Hostel (BH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Dr. P. K. Jena', email: 'warden.bh3@campus.edu', password: 'warden123', phone: '+91 94370 33301', designation: 'Hostel Warden', office: 'BH-3 Wing A Room 102', status: 'Active' },
  { id: 'warden-bh4', code: 'BH-4', hostel_name: 'Sushruta Boys Hostel (BH-4)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Dr. M. M. Mishra', email: 'warden.bh4@campus.edu', password: 'warden123', phone: '+91 94370 44401', designation: 'Hostel Warden', office: 'BH-4 Warden Chamber', status: 'Active' },
  { id: 'warden-bh5', code: 'BH-5', hostel_name: 'Bhaskara Boys Hostel (BH-5)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Prof. S. R. Pattnaik', email: 'warden.bh5@campus.edu', password: 'warden123', phone: '+91 94370 55501', designation: 'Hostel Warden', office: 'BH-5 Admin Office', status: 'Active' },
  { id: 'warden-bh6', code: 'BH-6', hostel_name: 'Brahmagupta Boys Hostel (BH-6)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Dr. K. C. Tripathy', email: 'warden.bh6@campus.edu', password: 'warden123', phone: '+91 94370 66601', designation: 'Hostel Warden', office: 'BH-6 Ground Floor', status: 'Active' },
  { id: 'warden-bh7', code: 'BH-7', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'Dr. S. K. Mahapatra', email: 'warden.bh7@campus.edu', password: 'warden123', phone: '+91 94370 77707', designation: 'Senior Hostel Warden', office: 'BH-7 Main Entrance Office', status: 'Active' },
  { id: 'warden-gh1', code: 'GH-1', hostel_name: 'Gargi Girls Hostel (GH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000008', name: 'Dr. Sunita Nayak', email: 'warden.gh1@campus.edu', password: 'warden123', phone: '+91 94370 88801', designation: 'Girls Hostel Warden', office: 'GH-1 Admin Block', status: 'Active' },
  { id: 'warden-gh2', code: 'GH-2', hostel_name: 'Maitreyi Girls Hostel (GH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000009', name: 'Dr. Rashmi Das', email: 'warden.gh2@campus.edu', password: 'warden123', phone: '+91 94370 99901', designation: 'Girls Hostel Warden', office: 'GH-2 Security Desk & Office', status: 'Active' },
  { id: 'warden-gh3', code: 'GH-3', hostel_name: 'Kalpana Chawla Girls Hostel (GH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000010', name: 'Dr. Meenakshi Sahu', email: 'warden.gh3@campus.edu', password: 'warden123', phone: '+91 94370 00011', designation: 'Girls Hostel Warden', office: 'GH-3 Warden Office', status: 'Active' },
];

const INITIAL_CATERERS = [
  { id: 'caterer-bh1', code: 'BH-1', hostel_name: 'Aryabhata Boys Hostel (BH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Rajesh Sharma', agency: 'Maa Tarini Foods', email: 'admin@mess.edu', password: 'admin123', phone: '+91 94370 11102', diningSeats: 180, mealRating: '4.6 ★', status: 'Active' },
  { id: 'caterer-bh2', code: 'BH-2', hostel_name: 'Varahamihira Boys Hostel (BH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Suresh Das', agency: 'Maa Tarini Caterers', email: 'bh2admin@mess.edu', password: 'admin123', phone: '+91 94370 22202', diningSeats: 170, mealRating: '4.6 ★', status: 'Active' },
  { id: 'caterer-bh3', code: 'BH-3', hostel_name: 'Charaka Boys Hostel (BH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Manoj Sahoo', agency: 'Sahoo Hospitality', email: 'bh3admin@mess.edu', password: 'admin123', phone: '+91 94370 33302', diningSeats: 190, mealRating: '4.5 ★', status: 'Active' },
  { id: 'caterer-bh4', code: 'BH-4', hostel_name: 'Sushruta Boys Hostel (BH-4)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Prakash Biswal', agency: 'Utkal Foods', email: 'bh4admin@mess.edu', password: 'admin123', phone: '+91 94370 44402', diningSeats: 185, mealRating: '4.6 ★', status: 'Active' },
  { id: 'caterer-bh5', code: 'BH-5', hostel_name: 'Bhaskara Boys Hostel (BH-5)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Deepak Panda', agency: 'Sai Kitchens', email: 'bh5admin@mess.edu', password: 'admin123', phone: '+91 94370 55502', diningSeats: 175, mealRating: '4.5 ★', status: 'Active' },
  { id: 'caterer-bh6', code: 'BH-6', hostel_name: 'Brahmagupta Boys Hostel (BH-6)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Niranjan Jena', agency: 'Royal Caterers', email: 'bh6admin@mess.edu', password: 'admin123', phone: '+91 94370 66602', diningSeats: 200, mealRating: '4.4 ★', status: 'Active' },
  { id: 'caterer-bh7', code: 'BH-7', hostel_name: 'BH-7 (Boys Hostel 7)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'Alok Verma', agency: 'Royal Dining Services', email: 'bh7admin@mess.edu', password: 'admin123', phone: '+91 94370 77708', diningSeats: 220, mealRating: '4.8 ★', status: 'Active' },
  { id: 'caterer-gh1', code: 'GH-1', hostel_name: 'Gargi Girls Hostel (GH-1)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000008', name: 'Priya Ray', agency: 'Priya Food Services', email: 'gh1admin@mess.edu', password: 'admin123', phone: '+91 94370 88802', diningSeats: 210, mealRating: '4.8 ★', status: 'Active' },
  { id: 'caterer-gh2', code: 'GH-2', hostel_name: 'Maitreyi Girls Hostel (GH-2)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000009', name: 'Sasmita Rout', agency: 'Annapurna Foods', email: 'gh2admin@mess.edu', password: 'admin123', phone: '+91 94370 99902', diningSeats: 200, mealRating: '4.7 ★', status: 'Active' },
  { id: 'caterer-gh3', code: 'GH-3', hostel_name: 'Kalpana Chawla Girls Hostel (GH-3)', hostel_id: 'a1b2c3d4-0000-0000-0000-000000000010', name: 'Bibhuti Sethi', agency: 'Shree Krishna Mess', email: 'gh3admin@mess.edu', password: 'admin123', phone: '+91 94370 00012', diningSeats: 230, mealRating: '4.9 ★', status: 'Active' },
];

export const HostelManagement = () => {
  const [activeTab, setActiveTab] = useState('buildings'); // 'buildings' | 'wardens' | 'caterers' | 'new_admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // 1. Hostels State
  const [hostels, setHostels] = useState(() => {
    try {
      const saved = localStorage.getItem('iterp_campus_hostels');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_HOSTEL_BLOCKS;
  });

  // 2. Wardens State
  const [wardens, setWardens] = useState(() => {
    try {
      const saved = localStorage.getItem('iterp_warden_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_WARDENS;
  });

  // 3. Mess Admins State
  const [caterers, setCaterers] = useState(() => {
    try {
      const saved = localStorage.getItem('iterp_caterer_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_CATERERS;
  });

  // Edit Modals
  const [editingHostel, setEditingHostel] = useState(null);
  const [isAddingHostel, setIsAddingHostel] = useState(false);
  const [hostelForm, setHostelForm] = useState({ id: '', code: '', name: '', type: 'Boys', capacity: 450, mess_capacity: 200, defaultWarden: '', defaultCaterer: '' });

  const [editingWarden, setEditingWarden] = useState(null);
  const [wardenForm, setWardenForm] = useState({ id: '', name: '', email: '', password: '', phone: '', designation: '', office: '', hostel_name: '', hostel_id: '', code: '' });

  const [editingCaterer, setEditingCaterer] = useState(null);
  const [catererForm, setCatererForm] = useState({ id: '', name: '', agency: '', email: '', password: '', phone: '', diningSeats: 200, mealRating: '4.6 ★', hostel_name: '', hostel_id: '', code: '' });

  // Creation Form State
  const [newAdminForm, setNewAdminForm] = useState({
    role: 'hostel_admin',
    full_name: '',
    email: '',
    password: '',
    phone: '',
    hostel_id: INITIAL_HOSTEL_BLOCKS[6].id,
  });

  const totalCapacity = hostels.reduce((acc, h) => acc + (Number(h.capacity) || 0), 0);
  const totalMessSeats = hostels.reduce((acc, h) => acc + (Number(h.mess_capacity) || 0), 0);

  // Sync custom admins with AuthContext
  const syncCustomAdminsWithStorage = (newWardenList, newCatererList) => {
    try {
      const customList = [];
      newWardenList.forEach((w) => {
        customList.push({
          id: w.id,
          email: w.email.toLowerCase(),
          password: w.password,
          full_name: w.name,
          role: 'hostel_admin',
          hostel_name: w.hostel_name,
          hostel_id: w.hostel_id,
          data: { id: w.id, full_name: w.name, role: 'hostel_admin', hostel_name: w.hostel_name, hostel_id: w.hostel_id, phone: w.phone }
        });
      });
      newCatererList.forEach((c) => {
        customList.push({
          id: c.id,
          email: c.email.toLowerCase(),
          password: c.password,
          full_name: `${c.name} (${c.agency})`,
          role: 'mess_admin',
          hostel_name: c.hostel_name,
          hostel_id: c.hostel_id,
          data: { id: c.id, full_name: c.name, role: 'mess_admin', hostel_name: c.hostel_name, hostel_id: c.hostel_id, phone: c.phone }
        });
      });
      localStorage.setItem('iterp_custom_admins', JSON.stringify(customList));
    } catch (e) {}
  };

  // --- Handlers: Hostel Building ---
  const handleOpenEditHostel = (h) => {
    setIsAddingHostel(false);
    setEditingHostel(h);
    setHostelForm({
      id: h.id,
      code: h.code || 'BH',
      name: h.name || '',
      type: h.type || 'Boys',
      capacity: Number(h.capacity) || 450,
      mess_capacity: Number(h.mess_capacity) || 200,
      defaultWarden: h.defaultWarden || '',
      defaultCaterer: h.defaultCaterer || '',
    });
  };

  const handleOpenAddHostel = () => {
    setIsAddingHostel(true);
    const newId = `hostel-${Date.now()}`;
    setEditingHostel({ id: newId });
    setHostelForm({
      id: newId,
      code: `BH-${hostels.length + 1}`,
      name: `Hostel Block ${hostels.length + 1}`,
      type: 'Boys',
      capacity: 450,
      mess_capacity: 200,
      defaultWarden: 'Prof. Assigned Warden',
      defaultCaterer: 'Campus Caterers',
    });
  };

  const handleSaveHostel = (e) => {
    e.preventDefault();
    if (!hostelForm.name.trim()) return;

    let updated;
    if (isAddingHostel) {
      const newBlock = {
        ...hostelForm,
        id: `hostel-${Date.now()}`,
        name: hostelForm.name.trim(),
        capacity: Number(hostelForm.capacity) || 0,
        mess_capacity: Number(hostelForm.mess_capacity) || 0,
      };
      updated = [...hostels, newBlock];
      setSaveSuccessMsg(`🎉 Added new hostel "${newBlock.name}"!`);
    } else {
      updated = hostels.map((h) => (h.id === hostelForm.id ? { ...h, ...hostelForm, capacity: Number(hostelForm.capacity) || 0, mess_capacity: Number(hostelForm.mess_capacity) || 0 } : h));
      setSaveSuccessMsg(`✓ Successfully updated ${hostelForm.name}!`);
    }

    setHostels(updated);
    try {
      localStorage.setItem('iterp_campus_hostels', JSON.stringify(updated));
    } catch (err) {}

    setEditingHostel(null);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // --- Handlers: Warden ---
  const handleOpenEditWarden = (w) => {
    setEditingWarden(w);
    setWardenForm({ ...w });
  };

  const handleSaveWarden = (e) => {
    e.preventDefault();
    if (!wardenForm.name.trim() || !wardenForm.email.trim()) return;

    const updated = wardens.map((w) => (w.id === wardenForm.id ? { ...w, ...wardenForm } : w));
    setWardens(updated);
    try {
      localStorage.setItem('iterp_warden_accounts', JSON.stringify(updated));
    } catch (e) {}

    // Update hostel display defaultWarden if needed
    const updatedHostels = hostels.map((h) => (h.id === wardenForm.hostel_id || h.name === wardenForm.hostel_name ? { ...h, defaultWarden: wardenForm.name } : h));
    setHostels(updatedHostels);
    try {
      localStorage.setItem('iterp_campus_hostels', JSON.stringify(updatedHostels));
    } catch (e) {}

    syncCustomAdminsWithStorage(updated, caterers);
    setEditingWarden(null);
    setSaveSuccessMsg(`✓ Warden details updated for ${wardenForm.hostel_name}!`);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // --- Handlers: Caterer ---
  const handleOpenEditCaterer = (c) => {
    setEditingCaterer(c);
    setCatererForm({ ...c });
  };

  const handleSaveCaterer = (e) => {
    e.preventDefault();
    if (!catererForm.name.trim() || !catererForm.email.trim()) return;

    const updated = caterers.map((c) => (c.id === catererForm.id ? { ...c, ...catererForm } : c));
    setCaterers(updated);
    try {
      localStorage.setItem('iterp_caterer_accounts', JSON.stringify(updated));
    } catch (e) {}

    // Update hostel display defaultCaterer if needed
    const updatedHostels = hostels.map((h) => (h.id === catererForm.hostel_id || h.name === catererForm.hostel_name ? { ...h, defaultCaterer: `${catererForm.name} (${catererForm.agency})` } : h));
    setHostels(updatedHostels);
    try {
      localStorage.setItem('iterp_campus_hostels', JSON.stringify(updatedHostels));
    } catch (e) {}

    syncCustomAdminsWithStorage(wardens, updated);
    setEditingCaterer(null);
    setSaveSuccessMsg(`✓ Mess Caterer details updated for ${catererForm.hostel_name}!`);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // --- Handlers: Issue New Admin ID ---
  const handleCreateNewAdmin = (e) => {
    e.preventDefault();
    if (!newAdminForm.full_name.trim() || !newAdminForm.email.trim() || !newAdminForm.password.trim()) return;

    const selectedHostel = hostels.find((h) => h.id === newAdminForm.hostel_id) || hostels[0];

    if (newAdminForm.role === 'hostel_admin') {
      const newW = {
        id: `warden-custom-${Date.now()}`,
        code: selectedHostel.code || 'BH',
        hostel_name: selectedHostel.name,
        hostel_id: selectedHostel.id,
        name: newAdminForm.full_name.trim(),
        email: newAdminForm.email.trim().toLowerCase(),
        password: newAdminForm.password.trim(),
        phone: newAdminForm.phone.trim() || '+91 94370 00000',
        designation: 'Hostel Warden',
        office: `${selectedHostel.name} Warden Office`,
        status: 'Active',
      };
      const updated = [newW, ...wardens];
      setWardens(updated);
      localStorage.setItem('iterp_warden_accounts', JSON.stringify(updated));
      syncCustomAdminsWithStorage(updated, caterers);
      setSaveSuccessMsg(`🎉 Issued new Warden login for ${selectedHostel.name}!`);
      setActiveTab('wardens');
    } else {
      const newC = {
        id: `caterer-custom-${Date.now()}`,
        code: selectedHostel.code || 'BH',
        hostel_name: selectedHostel.name,
        hostel_id: selectedHostel.id,
        name: newAdminForm.full_name.trim(),
        agency: 'Campus Caterers',
        email: newAdminForm.email.trim().toLowerCase(),
        password: newAdminForm.password.trim(),
        phone: newAdminForm.phone.trim() || '+91 94370 00000',
        diningSeats: selectedHostel.mess_capacity || 200,
        mealRating: '4.7 ★',
        status: 'Active',
      };
      const updated = [newC, ...caterers];
      setCaterers(updated);
      localStorage.setItem('iterp_caterer_accounts', JSON.stringify(updated));
      syncCustomAdminsWithStorage(wardens, updated);
      setSaveSuccessMsg(`🎉 Issued new Mess Caterer login for ${selectedHostel.name}!`);
      setActiveTab('caterers');
    }

    setNewAdminForm({ role: 'hostel_admin', full_name: '', email: '', password: '', phone: '', hostel_id: hostels[0].id });
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const copyCreds = (id, email, password, roleName, hostel) => {
    const text = `Campus Portal Credentials\nRole: ${roleName}\nHostel: ${hostel}\nUser ID: ${email}\nPassword: ${password}\nURL: ${window.location.origin}/login`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered lists
  const filteredHostels = hostels.filter((h) => !searchQuery.trim() || h.name.toLowerCase().includes(searchQuery.toLowerCase()) || (h.code && h.code.toLowerCase().includes(searchQuery.toLowerCase())));
  const filteredWardens = wardens.filter((w) => !searchQuery.trim() || w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.hostel_name.toLowerCase().includes(searchQuery.toLowerCase()) || w.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCaterers = caterers.filter((c) => !searchQuery.trim() || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.agency.toLowerCase().includes(searchQuery.toLowerCase()) || c.hostel_name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Campus Hostels & Governance Directorate</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
            Dedicated central directory separated for Hostel Buildings, Hostel Wardens, and Mess Admins.
          </p>
        </div>

        {/* Global Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('new_admin')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Issue Admin Login</span>
          </button>
        </div>
      </div>

      {/* Global Success Notification */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* ── Metric Highlights ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('buildings')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'buildings'
              ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hostel Buildings</p>
            <Building className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{hostels.length} Blocks</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{totalCapacity.toLocaleString()} Student Beds</p>
        </div>

        <div
          onClick={() => setActiveTab('wardens')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'wardens'
              ? 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-500 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hostel Wardens</p>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{wardens.length} Wardens</p>
          <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">Separate Governance Desk</p>
        </div>

        <div
          onClick={() => setActiveTab('caterers')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'caterers'
              ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mess Caterers</p>
            <ChefHat className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{caterers.length} Caterers</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{totalMessSeats.toLocaleString()} Dining Seats</p>
        </div>

        <div
          onClick={() => setActiveTab('new_admin')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'new_admin'
              ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-500 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Issue Admin Login</p>
            <UserPlus className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">+ Create ID</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Warden or Caterer ID</p>
        </div>
      </div>

      {/* ── Primary Separated Navigation Tabs ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab('buildings')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'buildings'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Hostel Buildings ({hostels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wardens')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'wardens'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Hostel Wardens ({wardens.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('caterers')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'caterers'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Mess Admins ({caterers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new_admin')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'new_admin'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Issue New ID</span>
          </button>
        </div>

        {/* Search */}
        {activeTab !== 'new_admin' && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB 1: HOSTEL BUILDINGS DIRECTORY
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'buildings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-500" />
                <span>Campus Hostel Buildings Directory</span>
              </h2>
              <p className="text-xs text-slate-500">Configure building capacity, bed counts, and dining hall allocations.</p>
            </div>

            <button
              onClick={handleOpenAddHostel}
              className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-bold text-xs hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Hostel Block</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHostels.map((h) => {
              const assignedWarden = wardens.find((w) => w.hostel_id === h.id || w.hostel_name === h.name);
              const assignedCaterer = caterers.find((c) => c.hostel_id === h.id || c.hostel_name === h.name);

              return (
                <div
                  key={h.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                          {h.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            h.type === 'Boys'
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200 dark:border-pink-800'
                          }`}
                        >
                          {h.type} Hostel
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">Code: {h.code || 'BH'}</p>
                    </div>

                    {/* Edit Hostel Button */}
                    <button
                      onClick={() => handleOpenEditHostel(h)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all flex items-center gap-1 text-xs font-bold shrink-0"
                      title="Edit Hostel Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Capacities */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Resident Capacity</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">{h.capacity} Students</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Dining Hall Seats</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{h.mess_capacity} Seats</p>
                    </div>
                  </div>

                  {/* Assigned Warden & Caterer */}
                  <div className="text-[11px] space-y-2 pt-2 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                        <span className="font-semibold">Hostel Warden:</span>
                      </span>
                      <button
                        onClick={() => {
                          if (assignedWarden) handleOpenEditWarden(assignedWarden);
                          else setActiveTab('wardens');
                        }}
                        className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
                        title="Click to view/edit warden"
                      >
                        {assignedWarden?.name || h.defaultWarden || 'Assign Warden'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-semibold">Mess Caterer:</span>
                      </span>
                      <button
                        onClick={() => {
                          if (assignedCaterer) handleOpenEditCaterer(assignedCaterer);
                          else setActiveTab('caterers');
                        }}
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                        title="Click to view/edit caterer"
                      >
                        {assignedCaterer?.name || h.defaultCaterer || 'Assign Caterer'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 2: SEPARATE HOSTEL WARDENS DIRECTORY
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'wardens' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-500" />
                <span>Hostel Wardens Directory ({wardens.length} Authorized Officers)</span>
              </h2>
              <p className="text-xs text-slate-500">Separated management for Hostel Wardens across BH-1 through GH-3.</p>
            </div>

            <button
              onClick={() => {
                setNewAdminForm({ ...newAdminForm, role: 'hostel_admin' });
                setActiveTab('new_admin');
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 font-bold text-xs hover:bg-purple-100 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Warden Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWardens.map((w) => (
              <div
                key={w.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-900 dark:text-white text-base">{w.name}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {w.designation || 'Hostel Warden'}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>{w.hostel_name}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenEditWarden(w)}
                      title="Edit Warden Profile & Login"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => copyCreds(w.id, w.email, w.password, 'Hostel Warden', w.hostel_name)}
                      title="Copy Login Credentials"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                    >
                      {copiedId === w.id ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Credential Details */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Login User ID:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{w.email}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-500">
                        {visiblePasswords[w.id] ? w.password : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(w.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {visiblePasswords[w.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Phone Contact:</span>
                    <span>{w.phone}</span>
                  </div>

                  {w.office && (
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Office Location:</span>
                      <span className="font-sans text-[11px]">{w.office}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 3: SEPARATE MESS ADMINS / CATERERS DIRECTORY
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'caterers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-500" />
                <span>Mess Admins & Caterers Directory ({caterers.length} Food Service Units)</span>
              </h2>
              <p className="text-xs text-slate-500">Separated management for Dining Hall Contractors and Mess Managers.</p>
            </div>

            <button
              onClick={() => {
                setNewAdminForm({ ...newAdminForm, role: 'mess_admin' });
                setActiveTab('new_admin');
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Mess Caterer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCaterers.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-900 dark:text-white text-base">{c.name}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {c.agency || 'Mess Caterer'}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>{c.hostel_name} (Dining Hall)</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenEditCaterer(c)}
                      title="Edit Caterer Profile & Login"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => copyCreds(c.id, c.email, c.password, 'Mess Caterer', c.hostel_name)}
                      title="Copy Login Credentials"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                    >
                      {copiedId === c.id ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Credential Details */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Login User ID:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{c.email}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-500">
                        {visiblePasswords[c.id] ? c.password : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(c.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {visiblePasswords[c.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Phone Contact:</span>
                    <span>{c.phone}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">Mess Seats & Rating:</span>
                    <span className="font-sans text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {c.diningSeats || 200} Seats • {c.mealRating || '4.6 ★'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 4: ISSUE NEW ADMIN LOGIN FORM
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'new_admin' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-500" />
              <span>Issue New Admin / Officer Credentials</span>
            </h2>
            <span className="text-xs text-slate-400">Directly syncs with portal login</span>
          </div>

          <form onSubmit={handleCreateNewAdmin} className="space-y-4 text-xs">
            {/* Role Choice */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Choose Admin Tier:</label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setNewAdminForm({ ...newAdminForm, role: 'hostel_admin' })}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    newAdminForm.role === 'hostel_admin'
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                  <span>Hostel Admin / Warden</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNewAdminForm({ ...newAdminForm, role: 'mess_admin' })}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                    newAdminForm.role === 'mess_admin'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ChefHat className="w-4 h-4 text-emerald-500" />
                  <span>Mess Caterer / Manager</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Name / Officer Name</label>
                <input
                  type="text"
                  required
                  value={newAdminForm.full_name}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, full_name: e.target.value })}
                  placeholder={newAdminForm.role === 'hostel_admin' ? 'Dr. Ramesh Sahu' : 'Maa Tarini Caterers'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Assigned Hostel */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Assign to Specific Hostel</label>
                <select
                  value={newAdminForm.hostel_id}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, hostel_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  {hostels.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">User ID / Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={newAdminForm.email}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                    placeholder={newAdminForm.role === 'hostel_admin' ? 'warden.bh2@campus.edu' : 'bh2admin@mess.edu'}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Set Login Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={newAdminForm.password}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                    placeholder="warden123 or admin123"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono font-bold text-amber-500"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300">Official Contact Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={newAdminForm.phone}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, phone: e.target.value })}
                    placeholder="+91 94370 00000"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Save & Issue Credentials</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL 1: EDIT HOSTEL BUILDING
      ══════════════════════════════════════════════════════════ */}
      {editingHostel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {isAddingHostel ? 'Add New Campus Hostel Block' : `Edit Hostel: ${hostelForm.name}`}
                  </h3>
                  <p className="text-[11px] text-slate-500">Update capacity, category, and dining seats</p>
                </div>
              </div>
              <button onClick={() => setEditingHostel(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHostel} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Hostel Full Name</label>
                  <input
                    type="text"
                    required
                    value={hostelForm.name}
                    onChange={(e) => setHostelForm({ ...hostelForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Hostel Category</label>
                  <select
                    value={hostelForm.type}
                    onChange={(e) => setHostelForm({ ...hostelForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Boys">Boys Hostel</option>
                    <option value="Girls">Girls Hostel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Resident Capacity (Students)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={hostelForm.capacity}
                    onChange={(e) => setHostelForm({ ...hostelForm, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Dining Hall Seats</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={hostelForm.mess_capacity}
                    onChange={(e) => setHostelForm({ ...hostelForm, mess_capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingHostel(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Hostel Block</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL 2: EDIT HOSTEL WARDEN
      ══════════════════════════════════════════════════════════ */}
      {editingWarden && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-purple-50/40 dark:bg-purple-950/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Edit Warden: {wardenForm.name}
                  </h3>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">{wardenForm.hostel_name}</p>
                </div>
              </div>
              <button onClick={() => setEditingWarden(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWarden} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Warden Officer Name</label>
                  <input
                    type="text"
                    required
                    value={wardenForm.name}
                    onChange={(e) => setWardenForm({ ...wardenForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Login User ID / Email</label>
                  <input
                    type="email"
                    required
                    value={wardenForm.email}
                    onChange={(e) => setWardenForm({ ...wardenForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <input
                    type="text"
                    required
                    value={wardenForm.password}
                    onChange={(e) => setWardenForm({ ...wardenForm, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold text-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                  <input
                    type="text"
                    value={wardenForm.phone}
                    onChange={(e) => setWardenForm({ ...wardenForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Designation / Title</label>
                  <input
                    type="text"
                    value={wardenForm.designation}
                    onChange={(e) => setWardenForm({ ...wardenForm, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Office Room / Location</label>
                  <input
                    type="text"
                    value={wardenForm.office}
                    onChange={(e) => setWardenForm({ ...wardenForm, office: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingWarden(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Warden Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL 3: EDIT MESS ADMIN / CATERER
      ══════════════════════════════════════════════════════════ */}
      {editingCaterer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Edit Mess Caterer: {catererForm.name}
                  </h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{catererForm.hostel_name} (Dining Hall)</p>
                </div>
              </div>
              <button onClick={() => setEditingCaterer(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCaterer} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Manager / Lead Name</label>
                  <input
                    type="text"
                    required
                    value={catererForm.name}
                    onChange={(e) => setCatererForm({ ...catererForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Agency / Firm Name</label>
                  <input
                    type="text"
                    required
                    value={catererForm.agency}
                    onChange={(e) => setCatererForm({ ...catererForm, agency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Login User ID / Email</label>
                  <input
                    type="email"
                    required
                    value={catererForm.email}
                    onChange={(e) => setCatererForm({ ...catererForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <input
                    type="text"
                    required
                    value={catererForm.password}
                    onChange={(e) => setCatererForm({ ...catererForm, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold text-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                  <input
                    type="text"
                    value={catererForm.phone}
                    onChange={(e) => setCatererForm({ ...catererForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Mess Dining Seats</label>
                  <input
                    type="number"
                    value={catererForm.diningSeats}
                    onChange={(e) => setCatererForm({ ...catererForm, diningSeats: Number(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingCaterer(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Mess Admin Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelManagement;
