import usePageTitle from '../../../hooks/usePageTitle';
import './ProblemDesc.css'

function ProblemDesc(props) {

    const {name, statement, tags, sampleInput, sampleOutput} = props.data;

    usePageTitle(`${name} - Coders Inc.`)

    return (
        <>
        <p className='problem-title'>{name}</p>
        <p className='problem-statement'>{statement}</p>
        <br />
        <table className='sampleio-table'>
            <thead>
                <tr>
                    <th>SAMPLE INPUT</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id='sample-input' style={{whiteSpace: 'pre-line'}}>{sampleInput}</td>
                </tr>
            </tbody>
        </table>
        <br />
        <table className='sampleio-table'>
            <thead>
                <tr>
                    <th>SAMPLE OUTPUT</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id='sample-output' style={{whiteSpace: 'pre-line'}}>{sampleOutput}</td>
                </tr>
            </tbody>
        </table>
        <br />
        <table className='sampleio-table'>
            <thead>
                <tr>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{tags.join(', ')}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default ProblemDesc
