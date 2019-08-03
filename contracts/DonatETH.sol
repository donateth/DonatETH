pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";
contract DonatETH is Ownable {
    
    enum UserType {MANAV, DAATA, VIDHATA, DOOT}
    enum docsStatus {SUBMITTED, VERIFIED, UNVERIFIED}
    enum orderStatus {ORDERED, DELIVERED, SHIPPED, PENDING}
    enum AppointmentStatus {PENDING, PROCESSING, COMPLETE}
    enum DonationQuality {JUST_LIKE_NEW, OLD_BUT_GOLD, OKAYISH}
    
    struct User {
        uint userId;
        string name;
        address userAddress;
        string email;
        string username;
        uint karma;
        UserType userType;
        mapping(uint => Appointment) appointments;
        uint aptCount;
        mapping(uint => Order) orders;
        uint orderCount;
    }
    
    struct Store {
        string name;
        uint storeId;
        address manager;
        string description;
        string media;
        uint itemCount;
        bool isActive;
        string[] docs;
        mapping(uint => Item) items;
        bool verificationStatus;
    }
    struct Item {
        string name;
        uint price;
        uint storeId;
        string media;
        uint itemId;
    }
    
    // struct VerificationDocs {
    //     string[] mediaLinks;
    //     uint storeId;
    //     bool verificationStatus;
    //     docsStatus status;
    //     address verifier;
    // }
    
    struct Appointment {
        uint appointmentId;
        AppointmentStatus status;
        User donator;
        User picker;
        uint quantity;
        bool paid;
        uint worth;
        string physicalAddress;
        string coordinates;
        string initiateDate;
        string completeDate;
    }
    
    struct Order {
        uint orderId;
        orderStatus status;
        User customer;
        uint quantity;
        bool paid;
        uint worth;
        string physicalAddress;
        string coordinates;
        string initiateDate;
        string completeDate;
        uint storeId;
        Item item;

    }


    // State Variables
    uint uid = 0;
    uint public storeCount = 0;
    uint public itemCount = 0;
    uint public appointmentId = 0;
    uint public orderId = 0;
    uint public itemId = 0;
    address public owner;

    mapping(uint => User) private users;
    mapping(address => User) private userAddressMap;
    mapping(uint => Store) public stores;
    mapping(uint => Appointment) allAppointments;
    mapping(uint => Order) allOrders;
    mapping(address => mapping(uint => Store)) public ownerStores;
    mapping(address => bool) public isAdmin;

    // Events
    event userCreated(uint uid);
    event storeCreated(uint _storeId);
    event itemCreated(uint _storeId, string name);
    event appointmentEvent(uint appointmentId, AppointmentStatus status);
    event orderEvent(uint orderId, orderStatus);
    event docsVerification(uint storeId, bool status);
    
    
    // Modifiers
    // Verifires caller's address
    modifier verifyCaller (address _address) { 
        require (msg.sender == _address); 
    _;
    }
    
    // Checks if store exists or not
    modifier checkStoreExistence(uint _storeID) {
        require(_storeID <= storeCount, "Invalid StoreID provided");
    _;
    }
    
    modifier checkOwnerOfStore(address _storeOwner, uint _storeID) {
        // Why I removed fallback string?
        // https://github.com/ethereum/solidity/issues/3971
        require (_storeOwner == stores[_storeID].manager);
        _;
    }
    // Checks if user paid enough
    modifier paidEnough(uint _totalPrice) { 
        require(msg.value >= _totalPrice); 
        _;
    }
    
    
    constructor() public {
        isAdmin[owner] = true;
    }
    
    function createUser(string memory _name, string memory  _email, string memory _username, UserType _userType) public returns (bool status) {
        User memory user = User({
            name: _name,
            email: _email,
            userId: uid++,
            username: _username,
            karma: 0,
            userAddress: msg.sender,
            userType: _userType,
            aptCount: 0,
            orderCount: 0
        });
        
        users[uid] = user;
        userAddressMap[msg.sender] = user;
        
        emit userCreated(uid);
        
        return true;
    }
    
    function createStore(string memory _name, string memory _description, string memory _media) public returns (bool status) {
        Store memory store = Store({
            name: _name,
            description: _description,
            media: _media,
            manager: msg.sender,
            isActive: true,
            storeId: storeCount++,
            itemCount: 0,
            docs: new string[](1), //fix later
            verificationStatus: true
        });
        
        stores[storeCount] = store;
        
        emit storeCreated(storeCount);
        
        return true;
    }
    
    function uploadDocs(string[] memory docsLink, uint _storeId) public returns (bool status) {
        
        stores[_storeId].docs = docsLink;
        
        return true;
    }
    
    function approveDocs(uint _storeId) public returns (bool status) {
        stores[_storeId].verificationStatus = true;
        stores[_storeId].isActive = true;
        
        emit docsVerification(_storeId, true);
        
        return true;
    }
    
    
    function createItem(string memory _name,  string memory _media, uint _price, uint _storeId) public returns (bool status){
        Item memory item = Item({
            name: _name,
            price: _price,
            storeId: _storeId,
            media: _media,
            itemId: itemCount++
        });
        
        stores[_storeId].items[stores[_storeId].itemCount] = item;
        
        emit itemCreated(_storeId, _name);
        
        return true;
    }
    
    function setAppointment(address _picker, uint _qty, uint _price, bool _paid, string memory _physicalAddress, string memory _coordinates, string memory _initialDate) public payable returns (bool status) {
        Appointment memory apt = Appointment({
            appointmentId: appointmentId++,
            status: AppointmentStatus.PENDING,
            donator: userAddressMap[msg.sender],
            picker: userAddressMap[_picker],
            quantity: _qty,
            paid: _paid,
            worth: _price,
            physicalAddress: _physicalAddress,
            coordinates: _coordinates,
            initiateDate: _initialDate,
            completeDate: ''
        });
        
        userAddressMap[msg.sender].appointments[userAddressMap[msg.sender].aptCount++] = apt;
        allAppointments[appointmentId++] = apt;
        
        emit appointmentEvent(appointmentId, apt.status);
        
        return true;
    }
    
        function setOrder(uint _storeId, uint _itemId, uint _qty, uint _price, bool _paid, string memory _physicalAddress, string memory _coordinates, string memory _initialDate) public payable returns (bool status) {
        Order memory order = Order({
            orderId: orderId++,
            status: orderStatus.ORDERED,
            customer: userAddressMap[msg.sender],
            quantity: _qty,
            paid: _paid,
            worth: _price,
            physicalAddress: _physicalAddress,
            coordinates: _coordinates,
            initiateDate: _initialDate,
            completeDate: '',
            storeId: _storeId,
            item: stores[_storeId].items[_itemId]
        });
        
        userAddressMap[msg.sender].orders[orderId] = order;
        userAddressMap[msg.sender].orderCount++;
        
        emit orderEvent(orderId, order.status);
        
        return true;
    }
    
    function getStore(uint _storeId) public view returns (string memory name, uint count, string memory description, string memory media){
        Store memory store = stores[_storeId];
        require(store.isActive == true, "Store is not yet active!");
        require(store.verificationStatus == true, "Store is not yet verified!");
        return (store.name, store.itemCount, store.description, store.media);
    }
    
    function getStoreItem(uint _itemId, uint _storeId) public view returns (string memory, uint, string memory) {
        Item memory item = stores[_storeId].items[_itemId];
        return (item.name, item.price, item.media);
    }
    
    function getUserAppointments(address _userAddress) public view returns (uint[] memory) {
        User storage curUser = userAddressMap[_userAddress];
        uint[] memory ret = new uint[](curUser.aptCount);
        for (uint i = 0; i < curUser.aptCount; i++) {
            ret[i] = curUser.appointments[i].appointmentId;
        }
        return ret;
    }

    function getUserOrders(address _userAddress) public view returns (uint[] memory) {
        User storage curUser = userAddressMap[_userAddress];
        uint[] memory ret = new uint[](curUser.aptCount);
        for (uint i = 0; i < curUser.orderCount; i++) {
            ret[i] = curUser.orders[i].orderId;
        }
        return ret;
    }
    
    function getAppointment(uint _appointmentId) public view returns (uint, AppointmentStatus , uint, uint, uint, string memory, string memory, string memory, string memory) {
        Appointment memory apt = allAppointments[_appointmentId];
        return (apt.appointmentId, apt.status, apt.donator.userId, apt.quantity, apt.worth, apt.physicalAddress, apt.coordinates, apt.initiateDate, apt.completeDate);
    }
    
    function getAllAppointment() public view returns (uint apts) {
        return appointmentId;
    }

    function getUserByAddress(address _userAddress) public view returns (string memory, string memory, string memory, UserType, uint, uint) {
        User memory user = userAddressMap[_userAddress];
        return (user.name, user.email, user.username, user.userType, user.aptCount, user.orderCount);
    }
    
    function getOrder(uint _orderId) public view returns (uint, uint, orderStatus , uint, uint, uint, string memory, string memory, string memory, string memory) {
        Order memory order = allOrders[_orderId];
        return (order.item.itemId, order.orderId, order.status, order.customer.userId, order.quantity, order.worth, order.physicalAddress, order.coordinates, order.initiateDate, order.completeDate);
    }
    
    function() external {
        revert();
    }
}
