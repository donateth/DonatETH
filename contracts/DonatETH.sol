pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
contract DonatETH {
    
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
        mapping(uint => Appointment) Appointments;
        mapping(uint => Order) Orders;
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
        string corrdinates;
        uint initiateDate;
        uint completeDate;
    }
    
    struct Order {
        uint orderId;
        orderStatus status;
        User customer;
        uint quantity;
        bool paid;
        uint worth;
        string physicalAddress;
        string corrdinates;
        uint initiateDate;
        uint completeDate;
        uint storeId;
        Item item;
        
    }
    
    
    // State Variables
    uint uid = 0;
    uint storeCount = 0;
    uint itemCount = 0;
    uint appointmentId = 0;
    address owner;
    
    mapping(uint => User) private users;
    mapping(uint => Store) stores;
    mapping(address => Appointment[]) userAppointments;
    mapping(address => Order[]) orders;
    mapping(address => mapping(uint => Store)) ownerStores;

    // Events
    event userCreated(uint uid);
    event storeCreated(uint _storeId);
    event itemCreated(uint _storeId, string name);
    event appointmentEvent(uint appointmentId, AppointmentStatus status);
    event orderEvent(uint orderId, orderStatus);
    event docsVerification(uint orderId, orderStatus);
    
    
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
        owner = msg.sender;
    }
    
    function createUser(string memory _name, string memory  _email, string memory _username, UserType _userType) public returns (bool status) {
        User memory user = User({
            name: _name,
            email: _email,
            userId: uid++,
            username: _username,
            karma: 0,
            userAddress: msg.sender,
            userType: _userType
        });
        
        users[uid] = user;
        
        emit userCreated(uid);
        
        return true;
    }
    
    function createStore(string memory _name, string memory _description, string memory _media) public returns (bool status) {
        Store memory store = Store({
            name: _name,
            description: _description,
            media: _media,
            manager: msg.sender,
            isActive: false,
            storeId: storeCount++,
            itemCount: 0,
            docs: new string[](1),
            verificationStatus: false
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
    
    
    
}
